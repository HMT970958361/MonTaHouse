<template>
  <div id="resaleHouse">
    <map-canvas
      id="map"
      v-show="showMap"
      @clooseMap="cMap($event)"
    ></map-canvas>
    <div id="top">
      <div class="top">
        <base-top-nav class="top-nav" :topNavList="topNavList"></base-top-nav>
        <base-login class="top-login"></base-login>
      </div>
    </div>
    <div id="search">
      <div class="search">
        <div class="search-left">
          <div class="pos-city">
            <span class="iconfont icon-position"></span>
            <span @click="setMap()">{{ nowPositon.province }}</span>
          </div>
          <a href="" class="search-title">
            <img
              src="../assets/images/resalecard_title2.png"
              alt="二手好房为您而选"
            />
          </a>
          <base-search
            :searchList="searchList"
            @search="searchHouse($event)"
          ></base-search>
        </div>
        <div class="search-right">
          <a href=""
            >下载筑梦家APP▼
            <img src="../assets/images/QRcode.png" alt="QRcode" />
          </a>
        </div>
      </div>
    </div>
    <div id="filter">
      <base-filter class="filter" houseType="resalehouse"></base-filter>
    </div>
    <div id="showList">
      <div class="show-list">
        <house-list id="houseList" :houseLists="houseData"></house-list>
        <hotmsg id="hotMsg"></hotmsg>
      </div>
    </div>
    <footer id="footer">
      <div class="footer">
      <base-foot-nav></base-foot-nav>
      <base-web-info></base-web-info>
      </div>
    </footer>
  </div>
</template>

<script>
import BaseFilter from "./baseComponents/BaseFilter.vue";
import BaseFootNav from "./baseComponents/BaseFootNav.vue";
import BaseLogin from "./baseComponents/BaseLogin.vue";
import BaseSearch from "./baseComponents/BaseSearch.vue";
import BaseTopNav from "./baseComponents/BaseTopNav.vue";
import Hotmsg from "./baseComponents/Hotmsg.vue";
import HouseCard from "./baseComponents/HouseCard.vue";
import HouseList from "./baseComponents/HouseList.vue";
import BaseWebInfo from "./baseComponents/BaseWebInfo.vue";
import MapCanvas from "./baseComponents/MapCanvas.vue";
export default {
  components: {
    BaseTopNav,
    BaseLogin,
    BaseSearch,
    BaseFilter,
    HouseList,
    Hotmsg,
    HouseCard,
    BaseFootNav,
    BaseWebInfo,
    MapCanvas,
  },
  data() {
    return {
      showMap: false,
      userlist:[
{"uid":0,"uemail":"970950000@qq.com","upw":"zmj0000","uname":"山抹微云","uphone":13883070000},
{"uid":1,"uemail":"970950001@qq.com","upw":"zmj0001","uname":"青衣水袖","uphone":13883070001},
{"uid":2,"uemail":"970950002@qq.com","upw":"zmj0002","uname":"风落尘归去","uphone":13883070002},
{"uid":3,"uemail":"970950003@qq.com","upw":"zmj0003","uname":"旧约圣经@","uphone":13883070003},
{"uid":4,"uemail":"970950004@qq.com","upw":"zmj0004","uname":"本命年","uphone":13883070004},
{"uid":5,"uemail":"970950005@qq.com","upw":"zmj0005","uname":"相思劫","uphone":13883070005},
{"uid":6,"uemail":"970950006@qq.com","upw":"zmj0006","uname":"ㄣ紫色岁月╬","uphone":13883070006},
{"uid":7,"uemail":"970950007@qq.com","upw":"zmj0007","uname":"晨钟暮鼓","uphone":13883070007},
{"uid":8,"uemail":"970950008@qq.com","upw":"zmj0008","uname":"待绾之人。","uphone":13883070008},
{"uid":9,"uemail":"970950009@qq.com","upw":"zmj0009","uname":"美人独凭栏︶","uphone":13883070009},
{"uid":10,"uemail":"970950010@qq.com","upw":"zmj0010","uname":"醉卧雕龙舫 、","uphone":13883070010},
{"uid":11,"uemail":"970950011@qq.com","upw":"zmj0011","uname":"┈━═☆浅色、记忆づ","uphone":13883070011},
{"uid":12,"uemail":"970950012@qq.com","upw":"zmj0012","uname":"ヤ烟雨夕阳ヤ","uphone":13883070012},
{"uid":13,"uemail":"970950013@qq.com","upw":"zmj0013","uname":"右岸亦怜度年华","uphone":13883070013},
{"uid":14,"uemail":"970950014@qq.com","upw":"zmj0014","uname":"对此欢终宴","uphone":13883070014},
{"uid":15,"uemail":"970950015@qq.com","upw":"zmj0015","uname":"吾皇本是俏佳人","uphone":13883070015},
{"uid":16,"uemail":"970950016@qq.com","upw":"zmj0016","uname":"岁月痕迹","uphone":13883070016},
{"uid":17,"uemail":"970950017@qq.com","upw":"zmj0017","uname":"眉间意难了","uphone":13883070017},
{"uid":18,"uemail":"970950018@qq.com","upw":"zmj0018","uname":"邈姒┮迋孑","uphone":13883070018},
{"uid":19,"uemail":"970950019@qq.com","upw":"zmj0019","uname":"末代情人° superf","uphone":13883070019},
{"uid":20,"uemail":"970950020@qq.com","upw":"zmj0020","uname":"记忆荏苒成泪 时光辗转成歌","uphone":13883070020},
{"uid":21,"uemail":"970950021@qq.com","upw":"zmj0021","uname":"清夜深林觅故人","uphone":13883070021},
{"uid":22,"uemail":"970950022@qq.com","upw":"zmj0022","uname":"蓝色幽灵","uphone":13883070022},
{"uid":23,"uemail":"970950023@qq.com","upw":"zmj0023","uname":"惊鸿一面","uphone":13883070023},
{"uid":24,"uemail":"970950024@qq.com","upw":"zmj0024","uname":"红鸾心动","uphone":13883070024},
{"uid":25,"uemail":"970950025@qq.com","upw":"zmj0025","uname":"妃子笑","uphone":13883070025},
{"uid":26,"uemail":"970950026@qq.com","upw":"zmj0026","uname":"一世沙场﹌只为你转眸一笑","uphone":13883070026},
{"uid":27,"uemail":"970950027@qq.com","upw":"zmj0027","uname":"朗月清风","uphone":13883070027},
{"uid":28,"uemail":"970950028@qq.com","upw":"zmj0028","uname":"白衣渡川","uphone":13883070028}
      ],
    };
  },
  mounted() {

    if (localStorage.province) this.$store.commit("setProvince");
    if (sessionStorage.search) {
      let search = sessionStorage.search;
      this.$store.commit("newsearch", search);
      sessionStorage.removeItem("search");
    }
    this.$store.dispatch("getData");
    // else this.$store.commit('updateData');//不要放在computed的houseData中，会导致搜索input时，再次执行本句，覆盖搜索内容。
  },
  watch: {
    nowPositon: function (newp, oldp) {
      if (newp.province == oldp.province) this.$store.commit("updateData");
      else this.$store.dispatch("getData");
    },
  },
  computed: {
    houseData: function () {
      return this.$store.state.houseData;
    },
    logined: function () {
      return this.$store.state.logined;
    },
    topNavList: function () {
      return this.$store.state.topNavList;
    },
    searchList: function () {
      return this.$store.state.searchList;
    },
    resaleFilter: function () {
      return this.$store.state.resaleFilter;
    },
    nowPositon: function () {
      return this.$store.state.nowPositon;
    },
    checked: function () {
      return this.$store.state.checked;
    },
  },
  methods: {
    setMap: function () {
      this.showMap = true;
    },
    searchHouse: function (search) {
      this.$store.commit("newsearch", search);
      this.$store.commit("updateData");
    },
    cMap: function (p) {
      this.showMap = false;
      this.$store.commit("setProvince", p);
      this.$store.dispatch("getData");
    },
  },
};
</script>

<style lang="less">
@mainWidth: 1024px;
body,
div {
  margin: 0;
  padding: 0;
}
// body{
//   //user-select:none;//禁用选择复制文本，用于阻止双击时自动选择文本
// }
#map {
  width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
}
#top {
  height: 40px;
  background-color: rgb(59, 59, 59);
  .top {
    padding:0px 20px;
    margin: 0px auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    font-size: 12px;
  }
  .top-login {
    color: white;
    line-height: 40px;
  }
}
#search {
  padding: 40px 0px;
  background-color: rgb(236, 236, 236);
  .search {
    padding: 0px 20px;
    margin: 0 auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .search-left {
      flex:1 1 auto;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      margin-right: 50px;
      .pos-city {
        flex: 0 0 130px;
        width: 130px;
        height: 60px;
        margin-right: 20px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        font-size: 24px;
        font-weight: bold;
        color: rgb(6, 173, 250);
        cursor: pointer;
        span:nth-child(2) {
          text-decoration: underline rgb(55, 188, 250);
          &:hover {
            color: rgb(0, 124, 182);
          }
        }
        .icon-position {
          font-size: 50px;
        }
      }
      .search-title img {
        width: 180px;
      }
      .base-search {
        width: 100%;
      }
      .base-search-type {
        color: rgb(59, 59, 59);
      }
    }
    .search-right {
      img {
        display: block;
        margin-top: 10px;
        width: 120px;
        transition: all 0.3s;
      }
      a {
        text-decoration: none;
        &:link {
          color: black;
        } /* 未访问的链接 */
        &:visited {
          color: black;
        } /* 已访问的链接 */
        &:hover {
          color: rgb(6, 173, 250);
          transition: all 0.3s;
          // img {
          //   opacity: 1;
          // }
        } /* 鼠标移动到链接上 */
        &:active {
          color: black;
        } /* 选定的链接，即鼠标按下去的时候不松开显示的状态 */
      }
    }
  }
}
#filter {
  background-color: rgb(255, 255, 255);
  padding: 20px 20px;
}
#showList {
  background-color: rgb(255, 255, 255);
  .show-list {
    padding: 20px 20px;
    margin: 0 auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
}
#footer{
  background-color: rgb(31, 31, 31);
  .footer{
      padding:0px 20px;
  }
}
@media screen and (max-width: @mainWidth) {
  body,
  #resaleHouse,#top{
    width: @mainWidth;
  }
  #top .top{
    width:@mainWidth - 50px;
    padding:0px 20px;
  }
  #search{
    width: @mainWidth;
    .search{
      width:@mainWidth - 50px;
    }
  }
  #filter .filter {
    width: @mainWidth - 50px;
    margin: 0 auto;
  }
  #showList{
    width: @mainWidth;
  .show-list{
    padding: 20px 20px;
    margin: 0 auto;
    display: flex;
    flex-flow: column nowrap;
    width:@mainWidth - 80px;
    .hot-msg{
      width: @mainWidth - 80px;
      margin: 20px auto;
    }
   }
  }
  #footer{
    padding:0px 20px;
  }
}
</style>