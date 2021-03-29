let express = require('express')
let ex = express()
let fs = require('fs')
let bodyParser = require('body-parser')
//let cookieParser= require('cookie-parser')
//let urlencodedParser = bodyParser.urlencoded({ extended: false })
ex.use(bodyParser.json({ extended: false })); 
ex.use("/assets", express.static('assets'))
//ex.use(cookieParser())

//路由导航主要页面

  ex.get('/index.html', function (req, res) {
    res.sendFile(__dirname+'/index.html')
  })
  ex.get('/resalehouse.html', function (req, res) {
    res.sendFile(__dirname + '/resalehouse.html')
  })
  ex.get('/login.html', function (req, res) {
    res.sendFile(__dirname + '/login.html')
  })

//响应数据请求
  ex.get('/resalehouse.html/province',function(req,res){//返回省级数据json
    console.log(req.query)
    let p = req.query.province;
    let housedata='';
    fs.access('./assets/json/data_house/'+p+'.json',(err,stats)=>{
      if(!err){
        let readerStream= fs.createReadStream('./assets/json/data_house/'+p+'.json');
        readerStream.setEncoding('UTF8');
        readerStream.on('data',function (chunk) {
          housedata+=chunk;
        });
        readerStream.on('end',function () {
          //console.log(housedata);
          res.json(housedata);
        });
      }
      else {
        console.log('./assets/data_house/'+p+'.json'+'不存在！')
        res.end();
      }
    });
  })
  ex.post('/login',function (req,res) {
    fs.access('./assets/json/user_account.json',(err,stats)=>{
      let loginMsg=req.body.loginMsg;
      let users='';
      if(!err){
        let readerStream= fs.createReadStream('./assets/json/user_account.json');
        readerStream.setEncoding('UTF8');
        readerStream.on('data',function (chunk) {
          users+=chunk;
        });
        readerStream.on('end',function () {
          let flag=null;
          users=JSON.parse(users);
          for(let user of users){
            if(user[loginMsg.type]===loginMsg.account){
              if(user.upw===loginMsg.upw){
                flag='successful';
                delete user.upw;
                res.end(JSON.stringify({successful:true,userMsg:{...user}}));break;
              }
              else {
                flag='pwErr';
                res.end(JSON.stringify({successful:false,err:"密码错误"}));break;
              }
            }
          }
          if(flag==null)res.end(JSON.stringify({successful:false,err:"账户不存在"}));
        });
      }
      else {
        console.log('用户文件错误！')
        res.end(JSON.stringify({successful:"false",err:"用户文件错误！"}));
      }
    });
  })
  ex.post('/reg',function (req,res) {
    let regMsg=JSON.parse(req.body.regMsg);
    fs.access('./assets/json/user_account.json',(err,stats)=>{
      if(!err){
        let data='';
        let readerStream= fs.createReadStream('./assets/json/user_account.json');
        readerStream.setEncoding('UTF8');
        readerStream.on('data',function (chunk) {
          data+=chunk;
        });
        readerStream.on('end',function () {
          let unReg=true;
          data=JSON.parse(data);
          for(let user of data){
            if(regMsg.uemail===user.uemail && user.uemail!=''){
            unReg=false;
            res.end(JSON.stringify({successful:false,err:"邮箱已注册"}));break;
          }
            if(regMsg.uphone===user.uphone  && user.uphone!=''){
              console.log(user)
              unReg=false;
              res.end(JSON.stringify({successful:false,err:"手机号已注册"}));break;
            }
          }
          if(unReg){
            let user={};
            user.uid=parseInt(data[data.length-1].uid)+1;
            user.uemail=regMsg.uemail;
            user.upw=regMsg.upw;
            user.uname=regMsg.uname;
            user.uphone=regMsg.uphone;
            user.uphoto='defaultphoto';
            data.push(user);
            fs.writeFile('./assets/json/user_account.json',JSON.stringify(data),err=>{
              if(err)return console.log(err);
              res.end(JSON.stringify({successful:true,userMsg:user}));
            })
            //流方法写文件
          //   let writerStream= fs.createWriteStream('./assets/json/user_account.json');
          //   writerStream.write(JSON.stringify(data),'UTF8');
          //   writerStream.end();
          //   writerStream.on('finish', function() {
          //     res.end(JSON.stringify({successful:true,userMsg:user}));
          // });
          }
        });
      }
    })
  })


let server = ex.listen(8000, function () {
    console.log('http://localhost:8000/login.html')
  })