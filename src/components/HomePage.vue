<template>
  <div id="homePage">
    <!-- 全国省级地图组件 -->
    <map-canvas id="map" v-if="showMap" @clooseMap="cMap($event)"></map-canvas>
    <!-- 头部：logo、导航栏、用户 -->
    <div id="header">
      <canvas id="canvas"></canvas>
      <div class="header">
        <div id="headerTop">
          <div class="homepage-logo">
            <a href="/login.html">
              <img src="../assets/images/MonTaLogo.png" alt="montalogo" />
            </a>
            <div class="logo-city">
              <span class="iconfont icon-position"></span>
              <span @click="setMap()">{{ nowPositon.province }}</span>
            </div>
          </div>
          <base-top-nav></base-top-nav>
          <base-login></base-login>
        </div>
        <div id="search-slogan">
          <img src="../assets/images/header.png" alt="header" />
        </div>
        <div id="search-rollmsg">
          <transition-group name="rollmsg" mode="out-in" tag="ul">
            <li
              v-for="roll of rollList"
              :key="roll.house"
              v-show="rollNow == roll.house"
            >
              {{ nowPositon.province }}{{ roll.text }}{{ roll.num
              }}{{ roll.unit }}
            </li>
          </transition-group>
        </div>
        <base-search id="serach-input" @search="gosearch($event)"></base-search>
      </div>
    </div>
    <div id="phoneApp">
      <div class="phoneApp-title">
        <img src="../assets/images/title.png" alt="title" />
        <p>
          集二手、新房、租房功能于一体，随时随地任性找房。<br />
          IM匿名咨询让您放心，消息动态推送让您省心，服务承诺让您安心，<br />
          数据百科锦囊让您感受贴心漫漫找房路，我们努力为您想更多。<br />
        </p>
      </div>
      <div class="app-down">
        <div class="app-down-span">
          <span>iPhone</span>
          <span>Android</span>
        </div>
        <img src="../assets/images/QRcode.png" alt="QRcode" />
      </div>
    </div>
    <div id="resaleCards">
      <div class="resale-cards">
        <div class="resale-cards-title">
          <img
            src="../assets/images/resalecard_title.png"
            alt="二手好房 为你精选"
          />
        </div>
        <div class="resale-cards-link">
          <p>好房源还多，筑梦家更懂你，我们呈现更好的精选</p>
          <a href="">更多重庆二手房源</a>
        </div>
        <div class="simple-cards">
          <base-simple-card
            v-for="card in resaleCards"
            :key="card.photourl"
            :card="card"
          ></base-simple-card>
        </div>
      </div>
    </div>
    <div id="communityCards">
      <div class="community-cards">
        <div class="community-cards-title">
          <img
            src="../assets/images/community_title.png"
            alt="二手好房 为你精选"
          />
          <div  class="com-cards-link">
            <p>纵览小区，恋上这座城</p>
            <a href="">更多重庆小区</a>
          </div>
        </div>
        <div class="community-card-list">
          <div
            v-for="card in communityCards"
            :key="card.name"
            class="community-card"
          >
            <div class="community-card-photo">
              <img
                :src="'../assets/images/comhouse/' + card.photourl"
                :alt="card.name"
              />
            </div>
            <div class="community-card-msg">
              <p>{{ card.name }}</p>
              <div class="community-card-msg-price">
                <span>{{ card.averPrice }}</span>
                <span>{{ card.age }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="newHouseCards">
      <div class="new-house-cards">
        <div class="new-house-cards-title">
          <img src="../assets/images/newhouse_title.png" alt="新房新启航" />
          <div class="new-house-cards-link">
            <p>真实楼盘准确同步，楼盘动态一手掌握</p>
            <a href="">更多重庆楼盘</a>
          </div>
        </div>
        <div class="new-house-cards-list">
          <div
            class="new-house-card"
            v-for="card in newHouseCards"
            :key="card.name"
          >
            <div class="new-house-card-photo">
              <img
                :src="'../assets/images/newhouse/' + card.photourl"
                :alt="card.name"
              />
            </div>
            <div class="new-house-card-msg">
              <div class="new-hosue-card-title">
                <p>{{ card.name }}</p>
                <p>{{ card.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="rentCards">
      <div class="rent-cards">
        <div class="rent-cards-title">
          <img
            src="../assets/images/renthouse_title.png"
            alt="品质租房选好房东"
          />
          <div>
            <p>高品质租房体验，从筑梦家开始</p>
            <a href="">更多重庆租房</a>
          </div>
        </div>
        <div class="rent-cards-list">
          <base-simple-card
            v-for="card in rentCards"
            :key="card.photourl"
            :card="card"
          ></base-simple-card>
        </div>
      </div>
    </div>
    <div id="verifyTruth">
      <div class="verify-truth">
        <img src="../assets/images/verify_title.png" alt="房源验证" />
        <div class="verify-search">
          <p>真实存在，真实在售，真实价格，真实图片！</p>
          <p>链家郑重向用户承诺：真实房源，假一赔百元！</p>
          <div class="verify-input">
            <input type="text" placeholder="请输入筑梦家房源编号查询真伪..." />
            <span class="iconfont icon-search"></span>
          </div>
        </div>
      </div>
    </div>
    <div id="foot">
      <div class="foot">
        <base-foot-nav></base-foot-nav>
        <base-web-info></base-web-info>
      </div>
    </div>
  </div>
</template>

<script>
import BaseFootNav from "./baseComponents/BaseFootNav.vue";
import BaseLogin from "./baseComponents/BaseLogin.vue";
import BaseSearch from "./baseComponents/BaseSearch.vue";
import BaseSimpleCard from "./baseComponents/BaseSimpleCard.vue";
import BaseTopNav from "./baseComponents/BaseTopNav.vue";
import BaseWebInfo from "./baseComponents/BaseWebInfo.vue";
import MapCanvas from "./baseComponents/MapCanvas.vue";
export default {
  components: {
    BaseTopNav,
    BaseSearch,
    BaseSimpleCard,
    BaseFootNav,
    BaseWebInfo,
    MapCanvas,
    BaseLogin,
  },
  data() {
    return {
      rollNow: "new",
      rollList: [
        { house: "new", text: "在售楼盘", num: 123, unit: "个" },
        { house: "rent", text: "发布出租房", num: 2345, unit: "套" },
        { house: "resale", text: "在售二手房", num: 3456, unit: "套" },
      ],
      communityCards: [
        {
          name: "远洋山水",
          averPrice: "5100元/平",
          age: "2016年建",
          photourl: "comhouse (1).jpg",
        },
        {
          name: "山水别院",
          averPrice: "5200元/平",
          age: "2018年建",
          photourl: "comhouse (2).jpg",
        },
        {
          name: "寰宇世家",
          averPrice: "5600元/平",
          age: "2015年建",
          photourl: "comhouse (3).jpg",
        },
      ],
      newHouseCards: [
        {
          name: "财信城",
          price: "80万/套",
          age: "2019年建",
          photourl: "newhouse (1).jpg",
        },
        {
          name: "城南华府",
          price: "5100元/平",
          age: "2018年建",
          photourl: "newhouse (2).jpg",
        },
        {
          name: "黄金水岸",
          price: "4900元/平",
          age: "2019年建",
          photourl: "newhouse (3).jpg",
        },
      ],
      showMap: false,
    };
  },
  computed: {
    resaleCards: function () {
      return this.$store.state.resaleCards;
    },
    rentCards: function () {
      return this.$store.state.rentCards;
    },
    nowPositon: function () {
      return this.$store.state.nowPositon;
    },
  },
  mounted: function () {
    //创建银河动效
    this.galaxy();
    //更新城市位置
    if (localStorage.province) this.$store.commit("setProvince");
    //信息条的滚动
    var roll = ["new", "rent", "resale"];
    var i = 1;
    setInterval(() => {
      this.rollNow = roll[i];
      if (i < 2) i++;
      else i = 0;
    }, 4000);
  },
  watch: {},
  methods: {
    gosearch: function (data) {
      if (data.type)
        switch (data.type) {
          case "找二手房":
            {
              sessionStorage.setItem("search", JSON.stringify(data));
              location.href = "http://localhost:8000/resalehouse.html";
            }
            break;
          default:break;
        }
    },
    setMap: function () {
      this.showMap = true;
    },
    cMap: function (p) {
      this.showMap = false;
      this.$store.commit("setProvince", p);
    },
    galaxy: function () {
      // let p=document.getElementById('header')
      // var oldcanv = document.getElementById('canvas');
      // p.removeChild(oldcanv);

      // var canv = document.createElement('canvas');
      // canv.id = 'canvas';
      // p.appendChild(canv);

      var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        w = (canvas.width = "1000"),
        h = (canvas.height = "460"),
        hue = 217,
        stars = [],
        count = 0,
        maxStars = 1000;

      // Thanks @jackrugile for the performance tip! http://codepen.io/jackrugile/pen/BjBGoM
      // Cache gradient
      var canvas2 = document.createElement("canvas"),
        ctx2 = canvas2.getContext("2d");
      canvas2.width = 100;
      canvas2.height = 100;
      var half = canvas2.width / 2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
      gradient2.addColorStop(0.025, "#fff");
      gradient2.addColorStop(0.1, "hsl(" + hue + ", 61%, 33%)");
      gradient2.addColorStop(0.25, "hsl(" + hue + ", 64%, 6%)");
      gradient2.addColorStop(1, "transparent");

      ctx2.fillStyle = gradient2;
      ctx2.beginPath();
      ctx2.arc(half, half, half, 0, Math.PI * 2);
      ctx2.fill();

      // End cache

      function random(min, max) {
        if (arguments.length < 2) {
          max = min;
          min = 0;
        }

        if (min > max) {
          var hold = max;
          max = min;
          min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      var Star = function () {
        this.orbitRadius = random(w / 2 - 50);
        this.radius = random(100, this.orbitRadius) / 10;
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 400000; //每圈20秒
        this.alpha = random(2, 10) / 10;

        count++;
        stars[count] = this;
      };

      Star.prototype.draw = function () {
        var x = Math.sin(this.timePassed + 1) * this.orbitRadius + this.orbitX,
          y = (Math.cos(this.timePassed) * this.orbitRadius) / 2 + this.orbitY,
          twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(
          canvas2,
          x - this.radius / 2,
          y - this.radius / 2,
          this.radius,
          this.radius
        );
        this.timePassed += this.speed;
      };

      for (var i = 0; i < maxStars; i++) {
        new Star();
      }
      console.log(stars[2]);
      let that = this;
      function animations() {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.8;
        //ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';//设置背景颜色
        ctx.fillStyle = "rgba(0,0,0,0)"; //设置canvas背景透明
        ctx.fillRect(0, 0, w, h);
        //ctx.globalCompositeOperation = 'source-over';
        ctx.globalCompositeOperation = "source-over"; //此选项会残留星星
        for (var i = 1, l = stars.length; i < l; i++) {
          stars[i].draw();
        }

        let x = requestAnimationFrame(animations);
        //重绘银河
        if (that.cancelAnimate) {
          stars = null;
          cancelAnimationFrame(x);
          console.log("清除了stars");
          that.cancelAnimate = false;
        }
      }
      animations();
    },
  },
};
</script>

<style lang="less">
@import "../assets/font_icon/iconfont.css";
@mainwidth: 1000px; //页面最小固定宽度
@minpadding: 20px; //页面左右两侧间隔
@cardpadding: 50px; //板块上下间距
@logoALinkcolor: white;
@logoALlinkcolorhover: rgb(6, 173, 250);
body,
p,
img,
div {
  margin: 0;
  padding: 0;
}
body {
  user-select: none; //禁用选择复制文本，用于阻止双击时自动选择文本
}
#canvas {
  //background:rgba(255,255,255,0);
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 2;
  opacity: 1;
  mix-blend-mode: exclusion; //混合模式
}
#map {
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
}
#header {
  background-color: black;
  background-image: url("../assets/images/back.png");
  background-position: -390px -240px;
  background-size: 1920px 1080px;
  background-repeat: no-repeat;
  .header {
    padding: 20px 20px 0px 20px;
  }
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 460px;
    position: absolute;
    z-index: 1;
    // background-image: url("../assets/images/back.png");
    // background-position: -390px -240px;
    // background-size:1920px 1080px;
    // background-attachment: fixed;
    // background-repeat: no-repeat;
  }
}
#headerTop {
  padding: 20px 20px;
  z-index: 5;
  position: relative;
  height: 40px;
  margin: 0px auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  .logo {
    width: 100px;
  }
  .homepage-logo {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    img {
      height: 40px;
    }
    a {
      font-size: 16px;
      text-decoration: none;
      &:link {
        color: @logoALinkcolor;
      } /* 未访问的链接 */
      &:visited {
        color: @logoALinkcolor;
      } /* 已访问的链接 */
      &:hover {
        color: @logoALlinkcolorhover;
        transition: all 0.3s;
      } /* 鼠标移动到链接上 */
      &:active {
        color: @logoALinkcolor;
      } /* 选定的链接，即鼠标按下去的时候不松开显示的状态 */
    }
  }
  .logo-city {
    width: 100px;
    height: 60px;
    //margin-right: 20px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: rgb(6, 173, 250);
    cursor: pointer;
    #map {
      width: 100%;
      height: 100%;
      z-index: 10;
      position: absolute;
      top: 0;
      left: 0;
    }
    .iconfont {
      font-size: 40px;
    }
    span:nth-child(2) {
      &:hover {
        color: rgb(0, 124, 182);
      }
    }
  }
  .base-topnav {
    font-weight: bold;
    width:540px;
  }
  .base-login {
    margin-left: 10px;
    height: 40px;
    line-height: 40px;
    color: white;
    .user {
      .user-msg,
      .user-my {
        .user-selectul {
          background-color: rgba(0, 0, 0, 0);
        }
      }
      .user-my {
        display: none;
      }
    }
  }
}
#search-slogan {
  z-index: 3;
  position: relative;
  margin: 100px auto;
  margin-bottom: 0px;
  text-align: center;
  img {
    height: 100px;
  }
}
#search-rollmsg {
  z-index: 3;
  position: relative;
  color: white;
  ul {
    width: 240px;
    margin: 40px auto;
    font-size: 20px;
    list-style: none;
    height: 30px;
    li {
      position: absolute;
      width: 240px;
      height: 30px;
      text-align: center;
    }
  }
}
#serach-input {
  z-index: 3;
  position: relative;
  width: 800px;
  margin: 0px auto;
  //padding-bottom: 40px;
}

#phoneApp {
  height: 400px;
  padding: @cardpadding @minpadding;
  background-color: black;
  background-image: url("../assets/images/phone.jpg");
  background-position: 50% 0%;
  background-size: 100%;
  background-repeat: no-repeat;
  .phoneApp-title {
    width: @mainwidth;
    margin: 0px auto;
    img {
      width: 280px;
    }
    p {
      color: white;
      padding: 10px 0px;
    }
  }
  .app-down {
    width: @mainwidth;
    margin: 0px auto;
    display: flex;
    flex-flow: row nowrap;
    span {
      display: block;
      height: 50px;
      width: 120px;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
      color: white;
      background-color: rgb(40, 185, 243);
      &:hover {
        background-color: rgb(0, 160, 223);
        transition: all 0.5s;
      }
    }
    span:last-child {
      margin-top: 20px;
    }
    img {
      width: 120px;
      height: 120px;
      margin-left: 10px;
    }
  }
}

#resaleCards {
  background-color: rgb(233, 233, 233);
  .resale-cards {
    width: @mainwidth;
    margin: 0px auto;
    padding: @cardpadding @minpadding;
  }
  .resale-cards-title {
    img {
      //微软雅黑+幼圆
      height: 60px;
    }
  }
  .resale-cards-link {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding-right: 20px;
    p {
      font-size: 18px;
      color: rgb(88, 88, 88);
      padding: 0px 0px;
    }
    a {
      position: relative;
      font-size: 16px;
      //text-decoration: underline rgb(0, 150, 250);
      &:link {
        color: rgb(88, 88, 88);
      } /* 未访问的链接 */
      &:visited {
        color: rgb(88, 88, 88);
      } /* 已访问的链接 */
      &:hover {
        color: #0077ff;
        text-decoration: underline #0077ff;
        transition: all 0.3s;
      } /* 鼠标移动到链接上 */
      &:active {
        color: rgb(88, 88, 88);
      } /* 选定的链接，即鼠标按下去的时候不松开显示的状态 */
    }
  }
  .simple-cards {
    margin-top: 20px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
  }
}

#communityCards {
  width: 100%;
  background-color: rgb(222, 222, 222);
  .community-cards {
    width: @mainwidth;
    margin: 0px auto;
    padding: @cardpadding @minpadding;
    .community-cards-title {
      img {
        height: 60px;
      }
      .com-cards-link {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        padding-right:20px;
        p {
          font-size: 18px;
          color: rgb(50, 50, 50);
        }
        a {
          font-size: 16px;
          //text-decoration: underline rgb(50, 50, 50);
          &:link {
            color: rgb(50, 50, 50);
          } /* 未访问的链接 */
          &:visited {
            color: rgb(50, 50, 50);
          } /* 已访问的链接 */
          &:hover {
            color: rgb(0, 0, 0);
            text-decoration: underline rgb(0, 0, 0);
            transition: all 0.3s;
          } /* 鼠标移动到链接上 */
          &:active {
            color: rgb(50, 50, 50);
          } /* 选定的链接，即鼠标按下去的时候不松开显示的状态 */
        }
      }
    }
    .community-card-list {
      margin-top: 20px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
    }
    .community-card {
      background-color: white;
      box-shadow: 0px 0px 10px rgb(201, 201, 201);
      .community-card-photo {
        width: 300px;
        overflow: hidden;
        img {
          width: 300px;
          height: 200px;
          transition: all 1s; //鼠标离开时平滑过渡
          &:hover {
            transform: scale(1.2);
            transition: all 1s;
          }
        }
      }
      .community-card-msg {
        margin: 10px;
        p {
          font-size: 20px;
          font-weight: bold;
        }
      }
      .community-card-msg-price {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        padding: 5px 0px;
        color: gray;
        z-index: 2;
        span:first-child {
          color: black;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }
}

#newHouseCards {
  background-color: rgb(233, 233, 233);
  .new-house-cards {
    width: @mainwidth;
    margin: 0px auto;
    padding: @cardpadding @minpadding;
  }
  .new-house-cards-title {
    img {
      height: 60px;
    }
    p {
      font-size: 18px;
      color: rgb(88, 88, 88);
    }
    a {
      position: relative;
      font-size: 16px;
      &:link {
        color: rgb(88, 88, 88);
      } /* 未访问的链接 */
      &:visited {
        color: rgb(88, 88, 88);
      } /* 已访问的链接 */
      &:hover {
        color: rgb(39, 39, 39);
        transition: all 0.3s;
        text-decoration: underline rgb(39, 39, 39);
      } /* 鼠标移动到链接上 */
      &:active {
        color: rgb(88, 88, 88);
      } /* 选定的链接，即鼠标按下去的时候不松开显示的状态 */
    }
    .new-house-cards-link {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      padding-right: 20px;
    }
  }
  .new-house-cards-list {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    margin-top: 20px;
  }
  .new-house-card {
    width: 300px;
    height: 200px;
    background-color: black;
    box-shadow: 0px 0px 10px grey;
    .new-house-card-photo {
      width: 300px;
      height: 200px;
      overflow: hidden;
      img {
        width: 300px;
        height: 200px;
        opacity: 0.8;
        transition: all 1s;
        &:hover {
          transform: scale(1.2);
          transition: all 1s;
        }
      }
    }
    .new-house-card-msg {
      position: relative;
      margin-top: -140px;
      .new-hosue-card-title {
        text-align: center;
        p:first-child {
          color: white;
          font-size: 32px;
          font-weight: bolder;
        }
        p:last-child {
          color: rgb(255, 226, 60);
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
}

#rentCards {
  width: 100%;
  background-color: rgb(222, 222, 222);
  .rent-cards {
    width: @mainwidth;
    margin: 0px auto;
    padding: @cardpadding @minpadding;
  }
  .rent-cards-title {
    img {
      height: 60px;
    }
    div {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      padding-right: 20px;
      p {
        font-size: 18px;
        color: rgb(50, 50, 50);
        padding: 5px 0px;
      }
      a {
        position: relative;
        font-size: 16px;
        //text-decoration: underline rgb(50, 50, 50);
        &:link {
          color: rgb(50, 50, 50);
        } /* 未访问的链接 */
        &:visited {
          color: rgb(50, 50, 50);
        } /* 已访问的链接 */
        &:hover {
          color: rgb(0, 0, 0);
          text-decoration: underline rgb(0, 0, 0);
          transition: all 0.3s;
        } /* 鼠标移动到链接上 */
        &:active {
          color: rgb(50, 50, 50);
        } /* 选定的链接，即鼠标按下去的时候不松开显示的状态 */
      }
    }
  }
  .rent-cards-list {
    width: @mainwidth;
    margin-top: 20px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
  }
}

#verifyTruth {
  background-color: rgba(0, 0, 0, 0.918);
  background-image: url("../assets/images/verify_backimg.png");
  background-position: 20% 60%;
  background-size: 80%;
  .verify-truth {
    width: @mainwidth;
    margin: 0px auto;
    padding: @cardpadding @minpadding;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    img {
      height: 100px;
    }
    p {
      color: white;
    }
  }
  .verify-search {
    p {
      padding: 0px 0px 2px 0px;
    }
    .verify-input {
      width: 400px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: flex-start;
      margin-top: 10px;
      input {
        width: 380px;
        padding: 10px;
        outline: none;
        border: none;
        font-size: 14px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      span {
        font-size: 24px;
        position: relative;
        margin-left: -30px;
        cursor: pointer;
      }
    }
  }
}
#foot {
  padding: 0px 100px;
  background-color: rgb(31, 31, 31);
}

.rollmsg-enter-active,
.rollmsg-leave-active {
  transition: all 1s;
}
.rollmsg-enter,
.rollmsg-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media screen and (max-width: @mainwidth+@minpadding*2) {
  body,
  #homePage {
    width: @mainwidth+ @minpadding*2;
  }
}
</style>