<template>
  <div class="base-filter">
    <div class="select-boxs-name">
      <p class="blod-key">位置</p>
      <span
        v-for="type in ['区域▼', '小区▼']"
        :key="type"
        :class="{ posactive: boxType == type }"
        @click="boxTypeChange(type)"
        >{{ type }}</span
      >
      <span v-show="boxType == '小区▼'" class="posactive">
        <i class="iconfont icon-address"></i
        >
        <span>{{ nowPositon.city ? nowPositon.city : nowPositon.province }}</span>
        <span v-if="nowPositon.area">{{nowPositon.area ? nowPositon.area : nowPositon.city}}</span>
      </span>
    </div>
    <div class="select-boxs-options" v-show="boxType == '区域▼'">
      <ul class="position-list">
        <li v-for="(cities, keyc) in posBoxs" :key="keyc" @click="cityChange(keyc)">
          <span :class="{ posactive: nowPositon.city == keyc }">{{keyc}}</span>
        </li>
      </ul>
      <ul class="position-list areas">
        <li v-for="(areas, keya) in posBoxs[nowPositon.city]" :key="keya" @click="areaChange(keya)">
          <span :class="{ posactive: nowPositon.area == keya }">{{keya}}</span>
        </li>
      </ul>
      <!-- <ul
        class="position-list"
        v-for="(cities, keyc) in posBoxs"
        :key="keyc"
      >
        <li
          v-for="(areas, keya) in cities"
          :key="keya"
          @click="areaChange(keyc, keya)"
        >
          <span :class="{ posactive: nowPositon.area == keya }">{{
            keya
          }}</span>
        </li>
      </ul> -->
      <ul class="position-list streets">
        <li
          v-for="street in nowstreets"
          :key="street"
          @click="streetChange(street)"
        >
          <span :class="{ posactive: nowPositon.street == street }">{{
            street
          }}</span>
        </li>
      </ul>
    </div>
    <div class="select-boxs-options" v-show="boxType == '小区▼'">
      <ul class="position-list">
        <li v-for="com in comBoxs" :key="com">
          <span
            :class="{ posactive: nowPositon.com == com }"
            @click="comChange(com)"
            >{{ com }}</span
          >
        </li>
      </ul>
    </div>
    <div class="filter">
      <form class="filter-form" ref="filter" style="height: 140px">
        <transition-group name="filter" tag="div">
          <div
            class="filter-ul"
            v-for="filter in checkBox"
            :key="filter.type"
          >
            <span class="blod-key">{{ filter.type }}</span>
            <ul class="filter-keys">
              <li v-for="li of filter.arr" :key="li.txt">
                <input
                  type="checkbox"
                  :id="li.txt"
                  :value="li.txt"
                  v-model="selects[filter.name]"
                />
                <label :for="li.txt">{{ li.txt }}</label>
              </li>
            </ul>
          </div>
        </transition-group>
      </form>
      <div class="show-more">
        <span :key="expandList" @click="expand()"
          >{{ expandList ? "更多选项▲" : "更多选项▼" }}
        </span>
      </div>
      <div class="filter-clear">
        <input
          type="reset"
          value="清空条件"
          class="clear-button"
          @click="reset()"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      boxType: "区域▼",
      expandList: false,
      selects: {
        price: [],
        room: [],
        acreage: [],
        floor: [],
        elevator: [],
        decoration: [],
      }, //checkbox勾选集合
    };
  },
  computed: {
    checkBox: function () {
      if (this.expandList) return this.checkBoxs;
      else return this.checkBoxs.slice(0, 4); //默认展示4个checkbox筛选词条
    },
    posBoxs: function () {
      return this.$store.getters.posBoxs;
    },
    comBoxs: function () {
      return this.$store.state.comBoxs;
    },
    checkBoxs: function () {
      return this.$store.state.checkBoxs;
    },
    nowstreets: function () {
      if (this.nowPositon.city || this.nowPositon.area)
        return this.posBoxs[this.nowPositon.city][this.nowPositon.area];
    },
    nowPositon: function () {
      return this.$store.state.nowPositon;
    },
  },
  mounted: function () {},
  watch: {
    selects: {
      //此处常规监听不到数组变更，需要如此书写
      handler() {
        this.$store.commit("newcheck", this.selects);
        this.$store.commit("updateData");
      },
      deep: true,
    },
  },
  methods: {
    reset: function () {
      this.boxType = "区域▼";
      for (let sort in this.selects) this.selects[sort] = [];
      this.$store.commit("resetfilter");
      this.$store.commit('updateData');
    },
    expand: function () {
      if (!this.expandList) this.$refs.filter.style.height = "185px";
      else this.$refs.filter.style.height = "110px";
      this.expandList = !this.expandList;
    },
    boxTypeChange: function (type) {
      this.boxType = type;
      for (let sort in this.selects) this.selects[sort] = [];
      let newpos = this.nowPositon;
      //newpos.province=this.nowPositon.province;
      //newpos.city = this.nowPositon.city;
      //newpos.area=this.nowPositon.area;
      newpos.street = ""; //清空选择的街道，
      newpos.com = ""; //默认在全area区域内找com
      this.$store.commit("newpos", newpos);
    },
    cityChange:function (city) {
      for (let sort in this.selects) this.selects[sort] = [];
      let newpos = this.nowPositon;
      //newpos.province=this.nowPositon.province;
      newpos.city = city;
      newpos.area = '';
      newpos.street = '';
      newpos.com = '';
      this.$store.commit("newpos", newpos);
    },
    areaChange: function (area) {
      for (let sort in this.selects) this.selects[sort] = [];
      let newpos = this.nowPositon;
      //newpos.province=this.nowPositon.province;
      //newpos.city = city;
      newpos.area = area;
      newpos.street = "";
      newpos.com = "";
      this.$store.commit("newpos", newpos);
    },
    streetChange: function (street) {
      let newpos = this.nowPositon;
      //newpos.province=this.nowPositon.province;
      //newpos.city = this.nowPositon.city;
      //newpos.area=this.nowPositon.area;
      newpos.street = street;
      //newpos.com = "";
      this.$store.commit("newpos", newpos);
    },
    comChange: function (com) {
      let newpos = this.nowPositon;
      //newpos.province=this.nowPositon.province;
      //newpos.city = this.nowPositon.city;
      //newpos.area=this.nowPositon.area;
      newpos.street = ""; //清空选择的街道，在全area区域内找com
      newpos.com = com;
      this.$store.commit("newpos", newpos);
    },

    //后端交互用：
    optionClick: function (e) {
      let dom = e.target;
      if (dom.nodeName.toLowerCase() == "span") {
        if (this.boxOption == dom.innerHTML) {
          this.boxOption = "";
          axios
            .get("/" + this.houseType + "/q", {
              params: {
                pos: {
                  boxName: this.boxName,
                  boxOption: this.boxOption,
                },
              },
            })
            .then((res) => {
              let getData = JSON.parse(res.data).reverse();
              this.$emit("posData", getData);
              this.$emit("posKey", this.boxOption);
            });
        } else {
          this.boxOption = dom.innerHTML;
          axios
            .get("/" + this.houseType + "/q", {
              params: {
                pos: {
                  boxName: this.boxName,
                  boxOption: this.boxOption,
                },
              },
            })
            .then((res) => {
              let getData = JSON.parse(res.data).reverse();
              this.$emit("posData", getData);
              this.$emit("posKey", this.boxOption);
            });
        }
      }
    },
    filter: function (e) {
      let key = e.target.name;
      let value = e.target.value;
      let valueArr = [];
      if (e.target.checked) {
        if (this.checkBoxArr.hasOwnProperty(key))
          this.checkBoxArr[key].push(value);
        else {
          valueArr.push(value);
          this.checkBoxArr[key] = valueArr;
        }
      } else {
        let index = this.checkBoxArr[key].indexOf(value);
        this.checkBoxArr[key].splice(index, 1);
        if (this.checkBoxArr[key].length == 0) delete this.checkBoxArr[key];
      }
      axios
        .get("/" + this.houseType + "/q", {
          params: {
            cBoxs: this.checkBoxArr,
            pos: {
              boxName: this.boxName,
              boxOption: this.boxOption,
            },
          },
        })
        .then((res) => {
          let getData = JSON.parse(res.data).reverse();
          //this.houseList = getData;
          this.$emit("posData", getData);
          this.$emit("posKey", this.boxOption);
        });
    },
  },
};
</script>

<style lang="less">
@filter-with: 100%;
@selectarea-with: 100%;
@keyword-width: 100px;
@filter-width: 100%;
@filter-key-width: 130px;
@filter-key-spacing: 10px;
//组件默认主题色
@filter-active-color: rgb(0, 162, 255);
@filter-cutline-color: #a8a8a82c;
@filter-button-color: rgb(255, 255, 255);
@filter-button-shadow-color: #23a7e4;

.blod-key {
  display: inline-block;
  font-weight: bold;
  width: @keyword-width;
  text-align: center;
  cursor: auto;
}
.filter-style {
  margin: 0 auto;
}
.select-boxs-name {
  width: @selectarea-with;
  margin: 10px 0px;
  span {
    margin-left: @keyword-width;
    margin: 0px 10px;
    text-align: left;
    cursor: pointer;
  }
}
.select-boxs-options {
  padding: 5px @keyword-width;
  padding-right: 0px;
  border-top: 2px solid @filter-cutline-color;
  border-bottom: 2px solid @filter-cutline-color;
  .position-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: start;
    align-items: center;
    margin-bottom: 0px;
    li {
      list-style-type: none;
      //width: @filter-key-width;
      margin: 6px @filter-key-spacing;
      font-size: 14px;
    }
    span:hover {
      cursor: pointer;
      text-decoration: underline @filter-active-color;
      color: @filter-active-color;
    }
  }
  .areas{
    border-radius: 5px 5px 0px 0px ;
    background-color: rgb(234, 234, 234);
    border-top: 1px solid @filter-cutline-color;
  }
  .streets {
    border-radius: 0px 0px 5px 5px;
    background-color: rgb(222, 222, 222);
    border-top: 1px solid @filter-cutline-color;
  }
}
.posactive {
  color: @filter-active-color;
}
.filter {
  //height:152px;
  width: @filter-width;
  margin: 20px 0px;
  .filter-form {
    transition: all 0.6s;
  }
  .filter-enter-active,
  .filter-leave-acitve {
    transition: all 0.3s 0.3s;
  }
  .filter-enter,
  .filter-leave-to {
    opacity: 0;
  }
  .filter-ul{
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    .filter-keys {
      list-style-type: none;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      li {
        width: @filter-key-width;
        margin: 2px @filter-key-spacing;
      }
    }
  }

  .filter-clear {
    margin-left: @keyword-width;
    input.clear-button {
      //margin: 20px 10px;
      width: 100px;
      height: 36px;
      outline: none;
      cursor: pointer;
      font-size: 16px;
      border: 1px solid @filter-button-shadow-color;
      border-radius: 5px;
      color: @filter-button-shadow-color;
      background-color: @filter-button-color;
      &:hover {
        color: @filter-button-color;
        background-color: @filter-active-color;
        transition: all 0.5s;
      }
    }
  }
  .show-more {
    //display: block;
    padding: 10px 0;
    text-align: center;
    border-top: 1px solid @filter-cutline-color;
    span {
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        cursor: pointer;
        text-decoration: underline @filter-active-color;
        color: @filter-active-color;
      }
    }
  }
}
</style>