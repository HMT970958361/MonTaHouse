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
    <div id="login" @touchmove.prevent @mousewheel.prevent v-show="showLogin">
      <div class="login-main">
        <span class="iconfont icon-close2" @click="showLogin = false"></span>
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
            <input
              type="button"
              value="登录"
              class="postmsg"
              @click="login()"
            />
                    <div class="reset-account">
          <span>忘记密码</span>
          <span>忘记账户</span>
          <span @click="islogin = false">注册账户</span>
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
                @click="reg()"
              />
            </div>
          </div>
        </transition-group>
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
        uphoto:'defaultphoto'
      },
      regMsg: {
        uname: "",
        upw: "",
        uemail: "",
        uphone: "",
        uphoto:'defaultphoto'
      },
      userMsg: {
        uid: "",
        uemail: "",
        uname: "",
        uphone: "",
        uphoto:'defaultphoto'
      },
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
      document.getElementById('login').style.left=(document.body.clientWidth-504)/2+'px';
      this.showLogin = true;
    },
    logout: function () {
      for (let key in this.userMsg) this.userMsg[key] = "";
      this.logined = false;
      localStorage.removeItem("userMsg"); //删除登录信息
      localStorage.removeItem("loginDate"); //删除登录信息
    },
    login: function () {
      //alert(JSON.stringify(this.loginMsg));
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
            this.showLogin = false;
          } else {
            alert(data.err);
          }
        });
    },
    reg: function () {
      alert('您的注册信息为： \n '+JSON.stringify(this.regMsg)+' \n 请牢记');
      axios
        .post("/reg", {
          regMsg: JSON.stringify(this.regMsg),
        })
        .then((res) => {
          let data = JSON.parse(JSON.stringify(res.data));
          console.log(data)
          if (data.successful) {
            this.logined = true;
            this.userMsg = data.userMsg;
            let loginDate = new Date();
            localStorage.setItem("userMsg", JSON.stringify(this.userMsg)); //储存登录信息
            localStorage.setItem("loginDate", loginDate.toISOString()); //储存登录时间
            this.showLogin = false;
          }
          else {
            alert(data.err);
          }
        });
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
#login {
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
      z-index: 10;
      border-radius: 20px;
      padding: 20px 50px;
      background-image: url("../../assets/images/login_back1.jpg");
      background-size: 1920px 1080px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      //filter: blur(2px);
    }
    .icon-close2 {
      z-index: 100;
      position: absolute;
      margin-left: 380px;
      margin-top: 5px;
      font-size: 50px;
      transition: all 0.5s;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        color: rgb(0, 140, 255);
      }
    }
    .login-title {
      z-index: 100;
      //width: 100%;
      height: 60px;
      margin-top:50px;
      padding: 0px 0px;
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
      z-index: 100;
      height: 400px;
      width:400px;
      .sign-in,
      .reg {
        height: 400px;
      width:400px;
        position: absolute;
        z-index: 100;
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
      z-index: 100;
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