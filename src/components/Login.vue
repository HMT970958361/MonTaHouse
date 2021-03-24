<template>
  <div>
    <map-canvas id="map" v-if="showMap" @clooseMap="cMap($event)"></map-canvas>
    <div class="homepage-logo">
      <a href="/index.html"><img src="../assets/images/MonTaLogo.png" alt="montalogo"/></a>
      <span class="iconfont icon-position"></span>
      <span class="logo-city" @click="showMap = true">{{ province }}</span>
    </div>
    <div class="logo-name">
      <img src="../assets/images/header.png" alt="筑梦家">
    </div>
    <div class="login" @touchmove.prevent @mousewheel.prevent>
      <div class="login-main">
        <div class="login-title">
          <span :class="{ loginORreg: islogin }" @click="islogin = !islogin"
            >登录</span
          >
          /
          <span :class="{ loginORreg: !islogin }" @click="islogin = !islogin"
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
          <input type="button" value="登录" class="postmsg" @click="login()" />
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
            <input type="button" value="注册" class="postmsg" @click="reg()" />
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
import MapCanvas from "./baseComponents/MapCanvas.vue";
export default {
  components: {
    MapCanvas,
  },
  data() {
    return {
      provinces: {
        北京: "北京市",
        天津: "天津市",
        河北: "河北省",
        山西: "山西省",
        内蒙古: "内蒙古自治区",
        辽宁: "辽宁省",
        吉林: "吉林省",
        黑龙江: "黑龙江省",
        上海: "上海市",
        江苏: "江苏省",
        浙江: "浙江省",
        安徽: "安徽省",
        福建: "福建省",
        江西: "江西省",
        山东: "山东省",
        河南: "河南省",
        湖北: "湖北省",
        湖南: "湖南省",
        广东: "广东省",
        广西: "广西壮族自治区",
        海南: "海南省",
        重庆: "重庆市",
        四川: "四川省",
        贵州: "贵州省",
        云南: "云南省",
        西藏: "西藏自治区",
        陕西: "陕西省",
        甘肃: "甘肃省",
        青海: "青海省",
        宁夏: "宁夏回族自治区",
        新疆: "新疆维吾尔自治区",
      },
      province: "重庆市",
      showMap: false,
      islogin: true,
      loginMsg: {
        type: "uemail",
        account: "",
        upw: "",
      },
      regMsg: {
        uname: "",
        upw: "",
        uemail: "",
        uphone: "",
      },
    };
  },
  mounted: function () {
    if (localStorage.getItem("province") != "undefined")
      this.province = localStorage.province;
    if (localStorage.getItem("loginDate") && localStorage.getItem("userMsg")) {
      let nowDate = new Date();
      let loginDate = new Date(localStorage.loginDate);
      loginDate.setDate(loginDate.getDate() + 7);
      if (nowDate < loginDate) {
        //展示可登录的账户
      }
    }
  },
  methods: {
    login: function () {
      alert(JSON.stringify(this.loginMsg));
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
            location.assign('http://localhost:8000/index.html')
          } else {
            alert(data.err);
          }
        });
    },
    reg: function () {
      alert(JSON.stringify(this.regMsg));
      axios
        .post("/reg", {
          regMsg: JSON.stringify(this.regMsg),
        })
        .then((res) => {
          let data = JSON.parse(JSON.stringify(res.data));
          if (data.successful) {
            this.logined = true;
            this.userMsg = data.userMsg;
            localStorage.setItem("userMsg", JSON.stringify(this.userMsg)); //储存登录信息
            location.assign('http://localhost:8000/index.html')
          }
        });
    },
    cMap: function (p) {
      if (p){
        this.showMap = false;
        this.province = this.provinces[p];
        localStorage.setItem("province", this.province);
      }
      else this.showMap = false;
    },
    meteor:function () {
      //流星动画脚本
    }
  },
};
</script>

<style lang='less'>
@import "../assets/font_icon/iconfont.css";
@login-color: rgba(0, 195, 255, 0.76);
@login-hover-color: rgb(0, 119, 216);
body,
div {
  margin: 0;
  padding: 0;
}
body {
  user-select: none;
  background-color: black;
  background-image: url("../assets/images/login_back1.jpg");
  background-size: 1920px 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
#canvas{
  z-index: 4;
  position: absolute;
  top:0;
  left: 0;
  opacity:0.5;
  mix-blend-mode: hard-light; //混合模式
}
#map {
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
}
.homepage-logo {
  width: 400px;
  padding:30px 30px;
  position: relative;//给元素设置z-idnex时需要配置postion
  z-index:20;
  color: white;
  font-weight: bolder;
  //margin:20px 20px;
  a{
    display: inline-block;
    height: 40px;
  img {
    height: 40px;
    margin-right: 20px;
  }
  }

  .iconfont {
    font-size: 40px;
  }
  .logo-city {
    cursor: pointer;
    color: rgb(0, 183, 255);
    &:hover {
      color: rgb(6, 113, 235);
    }
  }
}
.logo-name{
  z-index:20;
  position: absolute;
  top: 400px;
  left:100px;
  img{
    width: 500px;
  }
}
.login {
  z-index:20;
  position: absolute;
  top: 160px;
  right:50px;
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
      background-image: url("../assets/images/login_back1.jpg");
      background-size: 1920px 1080px;
      background-position: 70% 30%;
      background-repeat: no-repeat;
      filter: blur(4px);
      opacity: 0.8;
    }
    .login-title {
      z-index: 10;
      width: 100%;
      height: 80px;
      padding: 20px 0px;
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
      width:400px;
      .sign-in,
      .reg {
        height: 400px;
        width:400px;
        position: absolute;
        z-index: 10;
        input {
          width: 96%;
          height: 30px;
          margin: 10px auto;
          border-radius: 4px;
          padding: 0px 2%;
          border: none;
        }
      }
      input.postmsg {
        display: block;
        height: 40px;
        width: 100%;
        margin: 20px 0px;
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
      margin-top:0px;
      opacity: 1;
      transition: all 0.3s;
    }
    .loginTraslt-enter,
    .loginTraslt-leave-to {
      margin-top:-30px;
      opacity: 0;
    }
  }
}
@media screen and (max-width: 1180px){
  .homepage-logo{
      text-align: center;
      margin:0 auto;
  }
  .logo-name{
    position: relative;
    margin:0px auto;
    text-align: center;
    top:unset;
    left: unset;
  }
  .login{
    position: unset;
    margin-top:50px;
    .login-main{margin: 0 auto;}
    
  }
}
</style>