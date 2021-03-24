<template>
  <div class="house-list">
    <div class="list-sort">
      <ul class="sort-ul">
        <li
          v-for="(type, index) in sortType"
          :key="type"
          :class="{ sortactive: sortIndex == index }"
          @click="sortlist(type, index, $event)"
        >
          {{ type }}
          <transition name="isASC">
            <span
              v-show="sortIndex == index"
              :key="isASC"
              @click.stop="sortOrder()"
              >{{ isASC ? "▲" : "▼" }}
            </span>
          </transition>
        </li>
      </ul>
      <div class="sort-msg">
        <p class="sort-results">
          共找到<span>{{ houseListLength }}</span
          >套<span
            >{{nowPositon.province}}{{ nowPositon.city }}{{ nowPositon.area }}{{ nowPositon.street
            }}{{ nowPositon.com }}
            <span v-if="searchcontent">{{'包含“'+searchcontent+'”的'}}</span>{{ nowPositon.houseType }}
            </span>
        </p>
        <ul class="page-nav" v-show="cardList.length != 0">
          <li @click="goFirstPage()">首页</li>
          <li @click="goPreviousPageNav()">&lt;&lt;</li>
          <li @click="pageReduce()">&lt;</li>
          <li
            v-for="page in pageNavNow"
            :key="page"
            :class="{ pageactive: page == pageNow }"
            @click="pageNow = page"
          >
            {{ page }}
          </li>
          <li @click="pageAdd()">&gt;</li>
          <li @click="goNextPageNav()">&gt;&gt;</li>
          <li @click="goLastPage()">尾页</li>
          <li>共{{pageMax}}页</li>
        </ul>
      </div>
    </div>
    <div class="list-main">
      <div class="list-card" v-for="house in cardList" :key="house.num">
        <div class="cutline"></div>
        <house-card
          :card="house"
          :key="house.num"
          :class="{
            'sort-active-date':sortIndex==1,
            'sort-active-total':sortIndex==2,
            'sort-active-unit-price':sortIndex==3,
            'sort-active-acreage':sortIndex==4,
            }"
        ></house-card>
      </div>
    </div>
    <ul class="page-nav" v-show="cardList.length != 0">
      <li @click="goFirstPage()">首页</li>
      <li @click="goPreviousPageNav()">&lt;&lt;</li>
      <li @click="pageReduce()">&lt;</li>
      <li
        v-for="page in pageNavNow"
        :key="page"
        :class="{ pageactive: page == pageNow }"
        @click="pageNow = page"
      >
        {{ page }}
      </li>
      <li @click="pageAdd()">&gt;</li>
      <li @click="goNextPageNav()">&gt;&gt;</li>
      <li @click="goLastPage()">尾页</li>
      <li>共{{pageMax}}页</li>
    </ul>
  </div>
</template>

<script>
import Hotmsg from "./Hotmsg.vue";
import HouseCard from "./HouseCard.vue";
export default {
  components: { HouseCard, Hotmsg },
  props: {
    houseLists: {
      type: Array,
    },
    houseType: {
      type: Object,
    },
  },
  data() {
    return {
      sortType: ["默认排序", "最新发布", "总价", "单价", "面积"],
      sortIndex: 0, //当前排序方式
      houseList: [], //缓存源列表的副本
      houseListLength: 0, //card总数目
      cardList: [], //每页显示的card数组
      cardCount: 8, //每页显示的card数目
      pageMax: 0, //总共多少页
      pageNow: 1, //当前所在页数
      pageNavList: [], //页码数组
      pageNavCount: 6, //一个page-nav中至多有多少个页数，默认10
      pageNavNthMax: 1, //最大导航到第几个nav
      pageNavNow: [], //当前page导航ul显示的页数组
      pageNavNth: 1, //当前在第几个10页

      isASC: true, //升序（ascending order）
    };
  },
  computed: {
    nowPositon: function () {
      return this.$store.state.nowPositon;
    },
    searchcontent:function(){
      return this.$store.state.searchcontent;
    }
  },
  mounted() {
    if(this.houseLists)this.updatelist(this.houseLists);
  },
  watch: {
    houseLists: function (newvalue) {
      this.updatelist(newvalue);
    },
    pageNow: function () {
      if (this.pageNow < this.pageMax) {
        this.cardList = this.houseList.slice(
          (this.pageNow - 1) * this.cardCount,
          this.pageNow * this.cardCount
        );
      }
      if (this.pageNow >= this.pageMax) {
        this.cardList = this.houseList.slice(
          (this.pageNow - 1) * this.cardCount,
          this.houseListLength
        );
      }
    },
  },
  methods: {
    updatelist: function (newvalue) {
      //初始化数据
      this.houseList = newvalue; //总card数组
      this.houseListLength = newvalue.length; //card数量
      this.pageMax = Math.ceil(this.houseListLength / this.cardCount); //向大取最大页数
      this.pageNavNthMax = Math.ceil(this.pageMax / this.pageNavCount); //最大导航栏数
      //初始化导航页数组
      let nth = 0;
      let page = [];
      for (let i = 1; i <= this.pageMax; i++) {
        page.push(i);
        if (page.length >= this.pageNavCount || i == this.pageMax) {
          this.pageNavList[nth] = page;
          page = [];
          if (nth < this.pageNavNthMax) nth++;
        }
      }
      //初始化导航ul
      this.pageNow = 1;
      this.pageNavNth = 1;
      this.pageNavNow = this.pageNavList[this.pageNavNth - 1];
      //初始化当前页面的cardList
      if (this.pageNow < this.pageMax) {
        this.cardList = this.houseList.slice(
          //普通页
          (this.pageNow - 1) * this.cardCount,
          this.pageNow * this.cardCount
        );
      }
      if (this.pageNow >= this.pageMax) {
        //最后一页
        this.cardList = this.houseList.slice(
          (this.pageNow - 1) * this.cardCount,
          this.houseListLength
        );
      }
    },
    sortlist: function (type, index, e) {
      this.sortIndex = index;
      if (index == 0) {
        this.updatelist(this.houseLists);
      }
      if (index == 1) {
        this.isASC = true;
        let list = this.houseLists;
        let sortlist = [];
        let a = [];
        let listLength = list.length;
        for (let i = 0; i < list.length; i++) {
          a[i] = list[i].updatetime;
        }
        a = [...new Set(a)];
        a.sort();

        for (let j = 0; j < a.length; j++) {
          let x = 0;
          let y = a[j];
          for (let k = 0; k < listLength; k++) {
            x = list[k].updatetime;
            if (y == x) sortlist.push(list[k]);
          }
        }
        if (this.isASC) this.houseList = sortlist.reverse();
        else this.houseList = sortlist;
        this.updatelist(this.houseList);
      }
      if (index == 2) {
        this.isASC = true;
        let sortlist = [];
        for (let p = 20; p < 130; p += 10) {
          //分配桶
          let ilist = [];
          let i = 0;
          for (let j = 0; j < this.houseListLength; j++) {
            //装桶
            if (
              this.houseLists[j].price < p &&
              this.houseLists[j].price >= p - 10
            ) {
              ilist[i] = this.houseLists[j];
              i++;
            }
          }
          if (ilist.length == 1) sortlist = sortlist.concat(ilist);
          if (ilist.length > 1) {
            //桶排序
            let newlist = [];
            newlist[0] = ilist[0];
            for (let i = 1; i < ilist.length; i++) {
              newlist.unshift(ilist[i]);
              for (let n = 0; n < newlist.length - 1; n++) {
                if (newlist[n].price >= newlist[n + 1].price) {
                  let m = newlist[n + 1];
                  newlist[n + 1] = newlist[n];
                  newlist[n] = m;
                }
              }
            }
            sortlist = sortlist.concat(newlist);
          }
        }
        if (this.isASC) this.houseList = sortlist;
        else this.houseList = sortlist.reverse();
        this.updatelist(this.houseList);
      } //桶排序
      if (index == 3) {
        this.isASC = true;
        let list = this.houseLists;
        let sortlist = [];
        let a = [];
        let listLength = list.length;
        for (let i = 0; i < list.length; i++) {
          a[i] = list[i].unitprice;
        }
        a = [...new Set(a)];
        a.sort((x, y) => {
          return x - y;
        });
        for (let j = 0; j < a.length; j++) {
          let x = 0;
          let y = a[j];
          for (let k = 0; k < listLength; k++) {
            x = list[k].unitprice;
            if (y == x) sortlist.push(list[k]);
          }
        }
        if (this.isASC) this.houseList = sortlist;
        else this.houseList = sortlist.reverse();
        this.updatelist(this.houseList);
      } //set+匹配排序
      if (index == 4) {
        this.isASC = true;
        let list = this.houseLists;
        let sortlist = [];
        let a = [];
        let listLength = list.length;
        for (let i = 0; i < list.length; i++) {
          a[i] = list[i].acreage;
        }
        a = [...new Set(a)];
        a.sort((x, y) => {
          return x - y;
        });

        for (let j = 0; j < a.length; j++) {
          let x = 0;
          let y = a[j];
          for (let k = 0; k < listLength; k++) {
            x = list[k].acreage;
            if (y == x) sortlist.push(list[k]);
          }
        }
        if (this.isASC) this.houseList = sortlist;
        else this.houseList = sortlist.reverse();
        this.updatelist(this.houseList);
      } //set+匹配排序
    },
    sortOrder: function () {
      this.isASC = !this.isASC;
      this.houseList.reverse();
      this.updatelist(this.houseList);
    },
    pageAdd: function () {
      if (this.pageNow < this.pageMax) this.pageNow += 1;
      if (
        this.pageNow > [...this.pageNavNow].pop() &&
        this.pageNavNth < this.pageNavNthMax
      ) {
        this.pageNavNth += 1;
        this.pageNavNow = this.pageNavList[this.pageNavNth - 1];
      }
    },
    pageReduce: function () {
      if (this.pageNow > 1) this.pageNow -= 1;
      if (this.pageNow < this.pageNavNow[0] && this.pageNavNth > 1) {
        this.pageNavNth -= 1;
        this.pageNavNow = this.pageNavList[this.pageNavNth - 1];
      }
    },
    goFirstPage: function () {
      this.pageNow = 1;
      this.pageNavNth = 1;
      this.pageNavNow = this.pageNavList[0];
    },
    goLastPage: function () {
      this.pageNow = this.pageMax;
      this.pageNavNth = this.pageNavNthMax;
      this.pageNavNow = this.pageNavList[this.pageNavNth - 1];
    },
    goNextPageNav: function () {
      if (this.pageNavNth < this.pageNavNthMax) this.pageNavNth += 1;
      this.pageNavNow = this.pageNavList[this.pageNavNth - 1];
      this.pageNow = this.pageNavNow[0];
    },
    goPreviousPageNav: function () {
      if (this.pageNavNth > 1) this.pageNavNth -= 1;
      this.pageNavNow = this.pageNavList[this.pageNavNth - 1];
      this.pageNow = this.pageNavNow[0];
    },
  },
};
</script>

<style lang="less">
@activecolor: rgb(0, 132, 255);
.house-list {
  width: 100%;
  .flex {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  .sortactive {
    background: @activecolor;
    color: white;
    transition: all 0.5s;
  }
  .list-sort {
    .isASC-enter-active {
      transition: all 0.3s ease;
    }
    .isASC-leave-active {
      transition: all 0.1s linear;
    }
    .isASC-enter,
    .isASC-leave-to {
      opacity: 0;
    }
    ul.sort-ul {
      .flex();
      border-bottom: 2px solid @activecolor;
      list-style: none;
      cursor: pointer;
      li {
        vertical-align: middle;
        text-align: center;
        width: 100px;
        padding: 10px 10px;
        transition: all 0.5s;
        &:hover {
          background-color: @activecolor;
        }
      }
    }
    .sort-msg {
      .flex();
      justify-content: space-between;
      height: 60px;
      .sort-results {
        font-size: 24px;
        font-weight: bold;
        span:first-child {
          color: @activecolor;
        }
      }
    }
  }
  .page-nav {
    .flex();
    list-style-type: none;
    justify-content: flex-end;
    li {
      padding: 2px 6px;
      line-height: 26px;
      font-size: 14px;
      cursor: pointer;
      background-color: rgb(63, 63, 63);
      color: white;
      &.pageactive {
        background-color: @activecolor;
      }
      &:hover {
        background-color: @activecolor;
      }
    }
  }
  .list-main {
    .list-card .house-card {
      height: 200px;
      padding-bottom: 20px;
      transition: all 0.5s;
    }
    .sort-active-date{
      .update-time {
        color: @activecolor;
      }
    }
    .sort-active-total{
      .price-total{
        color: @activecolor;
      }
    }
    .sort-active-unit-price{
      .unit-price{
        color: @activecolor;
      }
    }
    .sort-active-acreage{
      .msg-acreage{
        color: @activecolor;
      }
    }
    .cutline {
      padding-top: 20px;
      border-top: 1px solid rgb(192, 192, 192);
    }
  }
  .nav-bottom {
    margin: 30px 0px;
  }
}
</style>