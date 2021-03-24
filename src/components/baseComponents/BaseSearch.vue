<template>
  <div class="base-search">
    <div class="base-search-div">
      <ul class="base-search-type" @click="selectType($event)">
        <li
          v-for="search in searchList"
          :key="search.type"
          :class="{ typeSelceted: searchType == search.type }"
        >
          {{ search.type }}
        </li>
      </ul>
      <span id="mark" style="margin-left: 12px"></span>
    </div>
    <div class="base-search-input">
      <input
        type="text"
        v-model="inputText"
        class="search-input"
        :placeholder="placeholder"
        @keyup.enter="submitInput()"
      />
      <a href="" class="find-in-map">
        <i class="iconfont icon-map"></i>
        <span>地图找房</span>
      </a>
      <input type="button" value="开始找房" class="search-submit" @click="submitInput()"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchList: {
      type: Array,
      default: () => [
        { type: "找二手房", palceholder: "请输入区域、商圈或小区名开始找房" },
        { type: "找新房", palceholder: "请输入楼盘名称开始找房" },
        { type: "找租房", palceholder: "请输入区域、商圈或小区名开始找房" },
        { type: "找小区", palceholder: "请输入小区名开始查找小区" },
        { type: "搜问答", palceholder: "房产知识有疑问？来搜搜看吧~" },
        { type: "找商铺办公室", palceholder: "搜索你想要找的商铺办公室" },
      ],
    },
  },
  data() {
    return {
      inputText: "",
      placeholder: "请输入区域、商圈或小区名开始找房",
      searchType: "",
    };
  },
  mounted() {
    this.searchType=this.searchList[0].type;
  },
  methods: {
    selectType: function (e) {
      if (e.target.nodeName == "LI") {
        let type = e.target.innerText;
        let x0 = document.getElementsByClassName("base-search-type")[0]
          .offsetLeft;
        let x1 = e.target.offsetLeft;
        let width = parseInt(e.target.offsetWidth);
        document.getElementById("mark").style.marginLeft =
          width / 2 + parseInt(x1 - x0) - 20 + "px";
        this.searchType = type;
        for (let t of this.searchList) {
          if (t.type == type) this.placeholder = t.palceholder;
        }
      }
    },
    submitInput:function () {
      let search = {content:this.inputText,type:this.searchType};
      this.$emit('search',search);
    }
  },
};
</script>

<style lang="less">
@import "../../assets/font_icon/iconfont.css";
.base-search{
  input,
  span,
  a {
    margin: 0;
    padding: 0;
  }
}

.base-search-type {
  margin: 0 auto;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  color: rgb(255, 255, 255);
  li {
    margin-right: 20px;
    cursor: pointer;
    font-weight: bold;
  }
}
#mark {
  display: inline-block;
  position: relative;
  margin-bottom: -5px;
  margin-left: 0px;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 10px solid rgb(255, 255, 255);
  transition: all 0.5s;
}
.typeSelceted {
  color: rgb(47, 207, 255);
}
.base-search-input {
  height: 60px;
  display: flex;
  flex-flow: row nowrap;
  a {
    text-decoration: none;
  }
  .search-input {
    flex:1 1 auto;
    padding: 10px;
    outline: none;
    border: none;
    font-size: 16px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .find-in-map {
    display: inline-block;
    width: 100px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: rgb(29, 146, 255);
    font-size: 12px;
    transition: all 0.5s;
    &:hover {
      color: rgb(0, 86, 185);
      transition: all 0.5s;
    }
  }
  .iconfont {
    font-size: 36px;
  }
  .search-submit {
    display: inline-block;
    width: 100px;
    padding: 10px;
    outline: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: white;
    background-color: rgb(29, 146, 255);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &:hover {
      background-color: rgb(3, 109, 207);
      transition: all 0.5s;
    }
  }
}
</style>