<template>
  <div class="base-foot-nav">
    <div class="base-foot-title">
      <ul class="base-foot-nav-ul">
        <li v-for="li in footNavList" :key="li.link">
          <a :href="li.url">{{ li.link }}</a>
        </li>
      </ul>
      <span><a href="">官方客服 1010 9666</a></span>
    </div>
    <div class="base-foot-linkboxs">
      <ul class="base-foot-linkboxs-name">
        <li
          v-for="name in linkBoxsNames"
          :key="name"
          :class="{ nameLight: nowlinkBox.name == name }"
          @mouseenter="chglinkbox($event)"
        >
          {{ name }}
        </li>
      </ul>
      <ul class="base-foot-linkboxs-boxs">
        <li v-for="box of linkBoxs[nowlinkBox.index].linkbox" :key="box">
          <a href="">{{ box }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footNavList: [
        { link: "关于筑梦家", url: "" },
        { link: "联系我们", url: "" },
        { link: "加入我们", url: "" },
        { link: "隐私声明", url: "" },
        { link: "网站地图", url: "" },
        { link: "友情链接", url: "" },
      ],
      linkBoxsNames: [
        "热门小区",
        "小区二手房",
        "地方新房",
        "地方二手房",
        "地方房产",
        "合作与友情链接",
      ],
      nowlinkBox: { name: "热门小区", index: 0 },
      linkBoxs: [
        {
          name: "热门小区",
          linkbox: [
            "聚兴园",
            "前进花园",
            "牡丹苑",
            "北苑家园",
            "莲葩园",
            "鸿博家园",
            "六区华悦国际公寓",
            "建邦华府",
            "金隅观澜时代",
            "朝阳嘉园",
            "吉祥雅筑",
            "郑王坟141号院",
            "成府路20号院",
            "新西广街",
            "宏城花园",
            "亚运豪庭",
            "联港嘉园D区",
            "星源国际",
            "鲁能7号院水岸公馆",
            "金域华府",
            "二期南苑",
            "北里三区",
            "和义西里二区",
            "程庄南里",
            "世豪花园",
            "舒至嘉园",
            "大西洋新城C区",
            "兰园",
            "梧桐苑栖凤园",
            "天通苑本一区安慧里三区",
            "富丰园小区",
            "韩庄子西里",
            "行宫园二里",
            "金色漫香林二期",
            "金隅丽港城",
            "沁春家园",
            "嘉特美公馆",
            "成和园",
            "雍景四",
            "季海运仓小区",
          ],
        },
        {
          name: "小区二手房",
          linkbox: [
            "朝阳新城五区二手房",
            "八里庄北里二手房",
            "澳景花庭二手房",
            "白家庄东里二手房",
            "望京花园东区二手房",
            "昊腾家园二手房",
            "臻园二手房",
            "保利紫荆香谷二手房",
            "丰卉家园二手房",
            "中昂时代广场二手房",
            "帅府园二期二手房",
            "海格国际二手房",
            "政洋家园二手房",
            "格兰晴天二手房",
            "国典华园二手房",
            "百子湾家园三区二手房",
            "燕化星城建德一里二手房",
            "宾阳北里二手房",
            "丽舍公寓二手房",
            "望陶园小区二手房",
          ],
        },
        {
          name: "地方新房",
          linkbox: [
            "北京新房",
            "长春新房",
            "成都新房",
            "重庆新房",
            "长沙新房",
            "大连新房",
            "佛山新房",
            "广州新房",
            "合肥新房",
            "杭州新房",
            "济南新房",
            "昆明新房",
            "南京新房",
            "青岛新房",
            "上海新房",
            "石家庄新房",
            "苏州新房",
            "沈阳新房",
            "深圳新房",
            "郑州新房",
          ],
        },
        {
          name: "地方二手房",
          linkbox: [
            "重庆二手房",
            "天津二手房",
            "沈阳二手房",
            "柳州二手房",
            "九江二手房",
            "长沙二手房",
            "南充二手房",
            "苏州二手房",
            "湛江二手房",
            "驻马店二手房",
            "无锡二手房",
            "大理二手房",
            "宜宾二手房",
            "武汉二手房",
            "淮安二手房",
            "包头二手房",
            "福州二手房",
            "达州二手房",
            "青岛二手房",
            "大连二手房",
            "北京二手房",
            "盐城二手房",
            "江阴二手房",
            "珠海二手房",
            "乌鲁木齐二手房",
            "合肥二手房",
            "北海二手房",
            "威海二手房",
            "嘉兴二手房",
            "衢州二手房",
            "泰安二手房",
            "张家口二手房",
            "岳阳二手房",
            "绵阳二手房",
            "厦门二手房",
            "义乌二手房",
            "淄博二手房",
            "兰州二手房",
            "黄石二手房",
            "泉州二手房",
          ],
        },
        {
          name: "地方房产",
          linkbox: [
            "北京房产",
            "长春房产",
            "成都房产",
            "重庆房产",
            "长沙房产",
            "大连房产",
            "佛山房产",
            "广州房产",
            "合肥房产",
            "杭州房产",
            "济南房产",
            "昆明房产",
            "南京房产",
            "青岛房产",
            "上海房产",
            "石家庄房产",
            "苏州房产",
            "沈阳房产",
            "深圳房产",
            "郑州房产",
          ],
        },
        {
          name: "合作与友情链接",
          linkbox: [
            "吉屋网",
            "武汉网",
            "装一网",
            "北京装修",
            "住建部网站",
            "腾讯房产",
            "华图公务员考试网",
            "北京律师",
            "北京律师咨询",
            "房产网分类信息网",
            "购物攻略",
            "北京分类信息网",
            "北京租房网",
            "装修效果图穷游网",
            "贝壳研究院",
            "买房知识",
          ],
        },
      ],
    };
  },
  methods: {
    chglinkbox: function (e) {
      this.nowlinkBox.name = e.target.innerText;
      this.nowlinkBox.index = this.linkBoxsNames.indexOf(this.nowlinkBox.name);
    },
  },
};
</script>

<style lang="less">
.base-foot-title {
  margin: 0 auto;
  padding: 10px 0px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  span {
    display: inline-block;
    line-height: 42px;
    font-family: Arial, Helvetica, sans-serif;
    a {
      font-size: 14px;
      text-decoration: none;
      &:link {
        color: white;
      } /* 未访问的链接 */
      &:visited {
        color: white;
      } /* 已访问的链接 */
      &:hover {
        color: rgb(6, 173, 250);
        transition: all 0.3s;
      } /* 鼠标移动到链接上 */
      &:active {
        color: white;
      } /* 选定的链接，即鼠标按下去的时候不松开显示的状态 */
    }
  }
}
.base-foot-nav-ul {
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 10px;
    a {
      font-size: 14px;
      text-decoration: none;
      &:link {
        color: white;
      } /* 未访问的链接 */
      &:visited {
        color: white;
      } /* 已访问的链接 */
      &:hover {
        color: rgb(6, 173, 250);
        transition: all 0.3s;
      } /* 鼠标移动到链接上 */
      &:active {
        color: white;
      } /* 选定的链接，即鼠标按下去的时候不松开显示的状态 */
    }
  }
}
.base-foot-linkboxs {
  margin: 0 auto;
  padding: 20px 0px;
  border-top: 1px solid rgb(107, 107, 107);
  border-bottom: 1px solid rgb(107, 107, 107);
  .base-foot-linkboxs-name {
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    li {
      padding: 10px;
      font-size: 14px;
      background-color: rgb(15, 15, 15);
      color: white;
      cursor: default;
      &:hover {
        background-color: rgb(0, 0, 0);
        color: rgb(6, 173, 250);
        transition: all 0.5s;
      }
    }
    .nameLight {
      background-color: rgb(0, 0, 0);
      color: rgb(6, 173, 250);
    }
  }
  .base-foot-linkboxs-boxs {
    height: 100px;
    margin-top: 10px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    list-style: none;
    li {
      padding: 5px;
      font-size: 14px;
      a {
        font-size: 12px;
        text-decoration: none;
        //padding:20px;
        &:link {
          color: white;
        } /* 未访问的链接 */
        &:visited {
          color: white;
        } /* 已访问的链接 */
        &:hover {
          color: rgb(6, 173, 250);
          transition: all 0.3s;
        } /* 鼠标移动到链接上 */
        &:active {
          color: white;
        } /* 选定的链接，即鼠标按下去的时候不松开显示的状态 */
      }
    }
  }
}
</style>