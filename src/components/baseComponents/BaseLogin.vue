<template>
  <div class="base-login">
    <div class="login-btn" v-if="!logined">
      <span @click="openLogin($event)">登录</span>&nbsp;/&nbsp;
      <span @click="openLogin($event)">注册</span>
    </div>
    <div class="user" v-if="logined">
      <div class="user-msg">
        <div class="user-base">
          <img
            class="user-photo"
            :src="'../../assets/images/user/u' + userMsg.uphoto + '.jpg'"
            alt="userphoto"
          />
          <a href="" class="user-name">{{ userMsg.uname }}</a>
        </div>
        <ul class="user-selectul">
          <li><a href="">个人中心</a></li>
          <li><a href="">我的订单</a></li>
          <li @click="logout()">注销登录</li>
          <li @click="showLogin = true">切换账号</li>
        </ul>
      </div>
      <div class="user-my">
        <span>我的订单</span>
        <ul class="user-selectul">
          <li><a href="">我的关注</a></li>
          <li><a href="">浏览记录</a></li>
          <li><a href="">我的经纪人</a></li>
        </ul>
      </div>
    </div>
    <div
      id="loginDiv"
      class="login"
      v-show="showLogin"
      @mousemove="slideMove($event)"
      @mouseup="slideUp($event)"
      @mouseleave="slideUp($event)"
    >
      <div class="login-main">
        <span class="iconfont icon-close2" @click="showLogin = false"></span>
        <div class="login-title">
          <span :class="{ loginORreg: islogin }" @click="loginORreg()"
            >登录</span
          >
          /
          <span :class="{ loginORreg: !islogin }" @click="loginORreg()"
            >注册</span
          >
        </div>
        <transition-group
          name="loginTraslt"
          class="login-traslt"
          tag="div"
          mode="out-in"
        >
          <div class="sign-in" v-if="islogin" key="login">
            <div class="login-type">
              <div class="login-type-btn">
                <span
                  :class="{ loginHL: loginMsg.type == 'uemail' }"
                  @click="loginMsg.type = 'uemail'"
                  >邮箱</span
                >
                &nbsp;/&nbsp;
                <span
                  :class="{ loginHL: loginMsg.type == 'uphone' }"
                  @click="loginMsg.type = 'uphone'"
                  >手机号码</span
                >
                &nbsp;/&nbsp;
                <span
                  :class="{ loginHL: loginMsg.type == 'uid' }"
                  @click="loginMsg.type = 'uid'"
                  >Uid</span
                >
              </div>
              <input
                type="text"
                v-model="loginMsg.account"
                :name="loginMsg.type"
                placeholder="请输入Uid、邮箱或手机号码"
              />
            </div>
            <div class="login-pw">
              密码<br />
              <input v-model="loginMsg.upw" type="password" name="upw" />
            </div>
            <input
              type="button"
              value="登录"
              class="postmsg"
              @click="showverify()"
            />
            <div id="slideArea" class="ver-slide" v-if="verify">
              <div id="slideFill" class="slide-fill"></div>
              <div
                id="slideDiv"
                style="margin-left: 0px"
                class="slide-div"
                @mousedown="slideDown($event)"
              >
                <span class="iconfont icon-slideRight"></span>
              </div>
            </div>
            <div class="verfiy-msg">
              <span>{{ verifyMsg }}</span>
            </div>
          </div>
          <div class="reg" v-else key="reg">
            <div>
              用户名<input
                type="text"
                v-model="regMsg.uname"
                required="required"
              />
              密码<input
                type="password"
                v-model="regMsg.upw"
                required="required"
              />
              电子邮箱<input
                type="email"
                v-model="regMsg.uemail"
                required="required"
              />
              手机号码<input type="text" v-model="regMsg.uphone" />
              <input
                type="button"
                value="注册"
                class="postmsg"
                @click="showverify()"
                v-if="!verify"
              />
              <div id="slideArea" class="ver-slide" v-else>
                <div id="slideFill" class="slide-fill"></div>
                <div
                  id="slideDiv"
                  style="margin-left: 0px"
                  class="slide-div"
                  @mousedown="slideDown($event)"
                >
                  <span class="iconfont icon-slideRight"></span>
                </div>
              </div>
              <div class="verfiy-msg">
                <span>{{ verifyMsg }}</span>
              </div>
            </div>
          </div>
        </transition-group>
        <div class="reset-account">
          <span>忘记密码</span>
          <span>忘记账户</span>
          <span @click="islogin = false">注册账户</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      logined: false,
      showLogin: false,
      islogin: true,
      loginMsg: {
        type: "uemail",
        account: "",
        upw: "",
        uphoto: "defaultphoto",
      },
      regMsg: {
        uname: "",
        upw: "",
        uemail: "",
        uphone: "",
        uphoto: "defaultphoto",
      },
      userMsg: {
        uid: "",
        uemail: "",
        uname: "",
        uphone: "",
        uphoto: "defaultphoto",
      },
      verify: false, //因login、reg不会同时渲染，所以相同的验证模块id不会被同时渲染，不会出现重复id的问题。
      verifyMsg: "",
      slide: false,
      slideDivMove: 0,
      x0: null,
      x1: null,
    };
  },

  mounted: function () {
    if (localStorage.getItem("loginDate") && localStorage.getItem("userMsg")) {
      let nowDate = new Date();
      let loginDate = new Date(localStorage.loginDate);
      loginDate.setDate(loginDate.getDate() + 7);
      if (nowDate < loginDate) {
        this.userMsg = JSON.parse(localStorage.userMsg);
        this.logined = true;
      }
    }
  },
  methods: {
    openLogin: function (e) {
      if (e.target.innerHTML == "注册") this.islogin = false;
      else this.islogin = true;
      document.getElementById("loginDiv").style.left =
        (document.body.clientWidth - 504) / 2 + "px";
      this.showLogin = true;
      this.verify = false;
    },
    loginORreg: function () {
      this.islogin = !this.islogin;
      this.verify = false;
    },
    logout: function () {
      for (let key in this.userMsg) this.userMsg[key] = "";
      this.logined = false;
      localStorage.removeItem("userMsg"); //删除登录信息
      localStorage.removeItem("loginDate"); //删除登录信息
    },
    showverify: function () {
      this.verifyMsg = "";
      //正则表达式
      var reg1 = /^[\w]{6,18}$/, //用户名  6--18位数字,字母,下划线_
        reg2 = /^[\W\da-zA-Z_]{6,20}$/, //密码  6--20位数字,字母,任意字符
        //reg3 = /^[\u4e00-\u9fa5]{2,7}$/,//姓名  2-7位的汉字
        //reg4 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,//身份证号  身份证号(15位、18位数字)，最后一位是校验位，可能为数字或字符X；
        reg5 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, //邮箱  任意+@+(任意字母数字)+.+(2-4个字母)
        reg6 = /^[1][\d]{10}$/; //手机号  首个数字为1，后面10为任意数字
      if(this.islogin){//验证登录信息格式
        if(this.loginMsg.account=="" || this.loginMsg.upw=="")this.verifyMsg='账户和密码不能为空！';
        else {
          let pass1=false,pass2=false;
          if(!reg2.test(this.loginMsg.upw))this.verifyMsg='密码不正确：应为6--20位数字,字母,任意字符';
          else pass1=true;
          switch (this.loginMsg.type) {
            case 'uemail':{if(!reg5.test(this.loginMsg.account))this.verifyMsg='邮箱格式不正确:应为 数字,字母,下划线_+@+(任意字母数字)+.+(2-4个字母)';else pass2=true;}break;
            case 'uphone':{if(!reg6.test(this.loginMsg.account))this.verifyMsg='手机号码格式不正确:应为1开头的10位数字！';else pass2=true;}break;
            case 'uid':{if(!reg1.test(this.loginMsg.account))this.verifyMsg='uid格式不正确：6--18位数字、字母或下划线_';else pass2=true;}break;
            default:this.verifyMsg='';break;
          }
          this.verify=pass1 && pass2;
        }
      }
      else {
        //验证注册信息格式
        if (
          this.regMsg.uname != "" ||
          this.regMsg.upw != "" ||
          this.regMsg.uemail != "" || this.regMsg.uphone != ""
        ) {
          if(!reg1.test(this.regMsg.uname))this.verifyMsg='用户名格式要求：应为6--18位数字、字母或下划线_';
          else if(!reg2.test(this.regMsg.upw))this.verifyMsg='密码格式要求：应为6--20位数字,字母,任意字符';
          else if(!reg5.test(this.regMsg.uemail))this.verifyMsg='邮箱格式不正确:缺少@字符，或@后不满足2-4个字母';
          else if(!reg6.test(this.regMsg.uphone))this.verifyMsg='手机号码格式不正确:应为1开头的10位数字';
        } else this.verifyMsg = "用户名、密码、邮箱和电话号不能为空！";
      }
    },
    login: function () {
      axios
        .post("/login", {
          loginMsg: this.loginMsg,
        })
        .then((res) => {
          let data = JSON.parse(JSON.stringify(res.data));
          if (data.successful) {
            this.logined = true;
            this.userMsg = data.userMsg;
            let loginDate = new Date();
            localStorage.setItem("userMsg", JSON.stringify(this.userMsg)); //储存登录信息
            localStorage.setItem("loginDate", loginDate.toISOString()); //储存登录时间
            location.assign("http://localhost:8000/index.html");
          } else {
            alert(data.err);
            this.verify = false;
          }
        });
    },
    reg: function () {
      axios
        .post("/reg", {
          regMsg: JSON.stringify(this.regMsg),
        })
        .then((res) => {
          let data = JSON.parse(JSON.stringify(res.data));
          if (data.successful) {
            this.logined = true;
            this.userMsg = data.userMsg;
            let loginDate = new Date();
            localStorage.setItem("userMsg", JSON.stringify(this.userMsg)); //储存登录信息
            localStorage.setItem("loginDate", loginDate.toISOString()); //储存登录时间
            alert("注册成功！");
            location.assign("http://localhost:8000/index.html");
          } else {
            alert(data.err);
            this.verify = false;
          }
        });
    },
    slideDown: function (e) {
      this.slide = true;
      this.x0 = e.clientX;
    },
    slideUp: function (e) {
      if (this.slide) {
        this.slide = false;
        let div = document.getElementById("slideDiv");
        if (parseInt(div.style.marginLeft) == 360) {
          //真人验证成功
          div.style.marginLeft = "0px";
          document.getElementById("slideFill").style.width = "0px";
          alert("验证成功！");
          if (this.islogin) this.login();
          else this.reg();
        } else if (parseInt(div.style.marginLeft) != 0) {
          //真人验证失败,不能滑动太快
          div.style.marginLeft = "0px";
          document.getElementById("slideFill").style.width = "0px";
        }
      }
    },
    slideMove: function (e) {
      if (this.slide) {
        let div = document.getElementById("slideDiv");
        let sildeDivleft = parseInt(div.style.marginLeft);
        this.x1 = e.clientX;
        this.slideDivMove = this.x1 - this.x0;
        if (
          this.slideDivMove >= 0 &&
          this.slideDivMove <= 360 &&
          sildeDivleft <= 360 &&
          sildeDivleft >= 0
        ) {
          div.style.marginLeft = this.slideDivMove + "px";
          document.getElementById("slideFill").style.width =
            this.slideDivMove + 10 + "px";
        }
      }
    },
  },
};
</script>

<style lang="less">
@import "../../assets/font_icon/iconfont.css";
@login-color: rgba(0, 195, 255, 0.76);
@login-hover-color: rgb(0, 140, 255);
@acolor: white; //导航a颜色
@acolorhover: rgb(6, 173, 250); //导航a聚焦时的颜色
.login-btn span {
  cursor: pointer;
  &:hover {
    color: rgb(0, 140, 255);
  }
}
.login {
  position: absolute;
  top: 100px;
  left: 30%;
  .login-main {
    height: 560px;
    width: 400px;
    padding: 20px 50px;
    border-radius: 20px;
    display: flex;
    flex-flow: column wrap;
    color: white;
    border: 2px solid rgb(174, 224, 236);
    box-shadow: 0 0 10px rgb(174, 224, 236);
    &::before {
      content: "";
      position: absolute;
      margin-left: -50px;
      margin-top: -20px;
      display: block;
      height: 560px;
      width: 400px;
      z-index: 2;
      border-radius: 20px;
      padding: 20px 50px;
      background-image: url("../../assets/images/login_back1.jpg");
      background-size: 1920px 1080px;
      background-position: 70% 30%;
      background-repeat: no-repeat;
      opacity: 1;
    }
    .icon-close2 {
      z-index: 11;
      position: absolute;
      margin-left: 380px;
      font-size: 42px;
      transition: all 0.4s;
      &:hover {
        color: rgb(0, 140, 255);
      }
    }
    .login-title {
      z-index: 10;
      width: 100%;
      height: 80px;
      padding: 10px 0px;
      text-align: center;
      span {
        font-size: 14px;
        transition: all 1s;
        cursor: pointer;
        &:hover {
          color: @login-hover-color;
          transition: all 0.2s;
        }
      }
      span.loginORreg {
        font-size: 48px;
        line-height: 60px;
        color: @login-color;
        transition: all 0.2s;
      }
    }
    .login-type {
      .login-type-btn {
        height: 30px;
      }
      span {
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          color: @login-hover-color;
        }
      }
      .loginHL {
        color: @login-color;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .login-traslt {
      z-index: 10;
      height: 400px;
      width: 400px;
      .sign-in,
      .reg {
        height: 400px;
        width: 400px;
        position: absolute;
        z-index: 10;
        input {
          width: 96%;
          height: 30px;
          margin: 0px auto;
          border-radius: 4px;
          padding: 0px 2%;
          border: none;
        }
      }
      input.postmsg {
        display: block;
        height: 40px;
        width: 100%;
        margin-top:20px;
        font-size: 20px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid rgb(174, 224, 236);
        background-color: @login-color;
        box-shadow: 0 0 10px @login-hover-color;
        transition: all 0.5s;
        &:hover {
          background-color: @login-hover-color;
          transition: all 0.5s;
        }
      }
      div.ver-slide {
        width: 100%; //400px
        height: 40px;
        margin-top: 20px;
        background-color: rgb(255, 255, 255);
        border-radius: 4px;
        &::before {
          content: "滑动验证";
          position: absolute;
          width: 100%;
          height: 40px;
          font-size: 14px;
          color: rgb(0, 119, 216);
          text-align: center;
          line-height: 40px;
        }
        .slide-div {
          position: absolute;
          margin-left: 0px;
          height: 40px;
          width: 40px;
          border-radius: 4px;
          background-color: rgb(0, 195, 255);
          text-align: center;
          line-height: 40px;
          .icon-slideRight {
            color: white;
            font-size: 22px;
          }
        }
        .slide-fill {
          position: absolute;
          border-radius: 4px;
          background-color: rgb(0, 124, 226);
          height: 40px;
          width: 0px;
        }
      }
      div.verfiy-msg{
        width: 100%;//400px
        height: 20px;
        margin-top:10px;
        font-size: 12px;
        line-height: 20px;
        color: red;
      }
    }
    .reset-account {
      text-align: end;
      z-index: 10;
      span {
        margin-left: 10px;
        color: white;
        cursor: pointer;
        &:hover {
          text-decoration: underline turquoise;
          color: rgb(45, 128, 253);
        }
      }
    }
    .loginTraslt-enter-active,
    .loginTraslt-leave-active {
      margin-top: 0px;
      opacity: 1;
      transition: all 0.3s;
    }
    .loginTraslt-enter,
    .loginTraslt-leave-to {
      margin-top: -30px;
      opacity: 0;
    }
  }
}

.user {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  a {
    text-decoration: none;
    &:link {
      color: @acolor;
    } /* 未访问的链接 */
    &:visited {
      color: @acolor;
    } /* 已访问的链接 */
    &:hover {
      color: @acolorhover;
      transition: all 0.3s;
    } /* 鼠标移动到链接上 */
    &:active {
      color: @acolor;
    } /* 选定的链接，即鼠标按下去的时候不松开显示的状态 */
  }
  .user-msg {
    color: white;
    &:hover {
      .user-selectul {
        display: block;
      }
    }
    .user-base {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .user-photo {
      height: 36px;
      width: 36px;
      padding: 2px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        box-shadow: 0 0 5px white;
      }
    }
    .user-name {
      width: 100px;
      display: block;
      height: 40px;
      margin-left: 5px;
      line-height: 40px;
      overflow: hidden;
    }
    .user-selectul {
      display: none;
      position: absolute;
      margin-left: 10px;
      z-index: 100;
      list-style: none;
      background-color: gray;
      border: 1px solid rgb(153, 214, 255);
      li {
        padding: 8px 20px;
        text-align: center;
        font-size: 14px;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          color: @acolorhover;
          background-color: rgb(31, 31, 31);
        }
      }
    }
  }
  .user-my {
    width: 80px;
    height: 40px;
    text-align: center;
    &:hover {
      .user-selectul {
        display: block;
      }
    }
    span {
      display: block;
      height: 40px;
      line-height: 40px;
    }
    .user-selectul {
      display: none;
      position: absolute;
      z-index: 100;
      list-style: none;
      border: 1px solid rgb(153, 214, 255);
      background-color: gray;
    }
    li {
      width: 80px;
      padding: 10px 0px;
      text-align: center;
      font-size: 14px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        color: @acolorhover;
        background-color: rgb(31, 31, 31);
      }
    }
  }
}
</style>