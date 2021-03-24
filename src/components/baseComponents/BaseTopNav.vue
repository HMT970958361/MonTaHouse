<template>
  <div class="base-topnav">
    <ul>
      <li v-for="i in topNavList" :key="i.nav">
        <a :href="i.url">{{ i.nav }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    topNavList: {
      type: Array,
      default: () => [
        { nav: "二手房", url: "./resalehouse.html" },
        { nav: "新房", url: "" },
        { nav: "租房", url: "" },
        { nav: "海外", url: "" },
        { nav: "商业办公", url: "" },
        { nav: "小区", url: "" },
        { nav: "经纪人", url: "" },
        { nav: "指南", url: "" },
        { nav: "工具", url: "" },
        { nav: "发布房源", url: "" },
      ],
    },
  },

  data() {
    return {};
  },
};
</script>

<style lang="less">
@import "../../assets/font_icon/iconfont.css";
@topNavHeight: 40px; //导航栏高度
@topNavWidth: 580px; //导航栏宽度
@acolor:rgb(255, 255, 255); //导航词条颜色
@acolorhover:rgb(6, 173, 250); //导航词条聚焦时的颜色
  a,
  span,
  img,
  ul {
    margin: 0;
    padding: 0;
  }
.base-topnav {
  width: @topNavWidth;
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
  ul {
    height: @topNavHeight;
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

