<template>
  <div class="hot-msg">
    <div class="gomap">
      <span class="iconfont icon-gomap"></span>
      <p>试试地图找房</p>
    </div>
    <div class="msg-card">
      <div class="msg-card-title">
        <span>今日发布</span>
        <a href="">更多</a>
      </div>
      <ul class="msg-card-list">
        <li v-for="(msg, index) in msgList" :key="msg.titlenum">
          <details :open="index < expandMsg">
            <summary>{{ msg.title }}</summary>
            <a href="">
              {{ msg.abstract }}
            </a>
          </details>
        </li>
      </ul>
    </div>
    <div class="msg-card">
      <div class="msg-card-title">
        <span>重庆热点</span>
        <a href="">更多</a>
      </div>
      <ul class="msg-card-list">
        <li v-for="(msg, index) in msgList" :key="msg.titlenum">
          <details :open="index < expandMsg">
            <summary>{{ msg.title }}</summary>
            <a href="">
              {{ msg.abstract }}
            </a>
          </details>
        </li>
      </ul>
    </div>
    <div class="app-down">
      <p>下载筑梦家APP</p>
      <p class="app-qrcode"></p>
      <p>扫描上方二维码<br />随时查看新房源</p>
      <a href="">了解更多</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msgList: [
        {
          titlenum: 1,
          title: "摄影师460㎡黑白极简大宅，越简单越高级！",
          abstract:
            "筑客“搬（迁）家（移）”完成啦！之前的星标会消失哦，小筑提醒大家需要再次“设为星标”动作~这样就",
          isshow: false,
        },
        {
          titlenum: 2,
          title: "啥家庭啊，拿一间房改造成家务区？",
          abstract:
            "这是 家居严选师 第922篇文章我们看到的很多案例中，都喜欢在阳台做洗衣家务区。一来满足了即洗即晾",
          isshow: false,
        },
        {
          titlenum: 3,
          title: "如何《坚守》指数投资！获得最大投资回报！",
          abstract:
            "加入知识星球找老齐的读书圈，每天10分钟语音，一年为您带来50本财经类书籍的精读和精讲本书内容，只免",
          isshow: false,
        },
        {
          titlenum: 4,
          title:
            "冬季高光时刻！石柱银杏迎来最佳观赏季，遍地金黄将秋色渲染到了极致！",
          abstract:
            "在中益乡金溪组生长了10多棵古银杏树树龄最长的有近千年要5、6人才能合抱树干树枝向四周伸展，树荫",
          isshow: false,
        },
        {
          titlenum: 5,
          title: "瑞雪兆丰年！今早石柱喜提多地下雪，很多地方都还正在下",
          abstract:
            "下雪了！下雪了！从昨晚开始石柱多个高海拔地区都下起了雪雪花洋洋洒洒大地白茫茫的一片",
          isshow: false,
        },
      ],
      expandMsg: 2, //默认展开2个信息表
    };
  },
  methods: {},
};
</script>

<style lang='less'>
.hot-msg {
  div,
  p,
  span,
  a,
  ul,
  li,
  details,
  summary {
    margin: 0;
    padding: 0;
  }
  width: 200px;
  margin-left: 40px;
  a {
    font-size: 12px;
    text-decoration: none;
    transition: all 0.3s;
    &:link {
      color: rgb(95, 95, 95);
    }
    &:visited {
      color: rgb(95, 95, 95);
    }
    &:hover {
      color: rgb(1, 182, 236);
      text-decoration: underline rgb(1, 182, 236);
      transition: all 0.3s;
    }
    &:active {
      color: rgb(95, 95, 95);
    }
  }
  .gomap {
    cursor: pointer;
    padding: 20px 0px;
    //margin-bottom: 40px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: white;
    background-color: #1d92ff;
    box-shadow: 0 0 10px rgb(0, 132, 255);
    transition: all 0.5s;
    &:hover {
      box-shadow: 0 0 20px rgb(0, 132, 255);
      background-color: rgb(4, 82, 155);
      transition: all 0.5s;
    }
    p {
      padding: 10px 0px;
    }
    .icon-gomap {
      display: block;
      font-size: 100px;
    }
  }
  .msg-card {
    padding: 20px 0px;
    .msg-card-title {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 24px;
        font-weight: bold;
      }
      a {
        font-size: 12px;
        text-decoration: underline rgb(0, 113, 189);
        transition: all 0.3s;
        &:link {
          color: rgb(0, 113, 189);
        }
        &:visited {
          color: rgb(0, 113, 189);
        }
        &:hover {
          color: rgb(1, 182, 236);
          text-decoration: underline rgb(1, 182, 236);
          transition: all 0.3s;
        }
        &:active {
          color: rgb(0, 113, 189);
        }
      }
    }
    .msg-card-list {
      margin-top: 10px;
      list-style: none;
      p {
        padding: 2px 0px;
        font-size: 12px;
        color: gray;
        text-align: justify;
      }
      details {
        padding: 5px 0px;
      }
      summary {
        height: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis; //省略号
        outline: none;
        cursor: pointer;
        font-size: 14px;
      }
    }
  }
  .app-down {
    a {
      font-size: 12px;
      transition: all 0.3s;
      text-decoration: underline rgb(0, 113, 189);
      &:link {
        color: rgb(0, 113, 189);
      }
      &:visited {
        color: rgb(0, 113, 189);
      }
      &:hover {
        color: rgb(1, 182, 236);
        transition: all 0.3s;
      }
      &:active {
        color: rgb(0, 113, 189);
      }
    }
    & p:nth-child(1) {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .app-qrcode {
      height: 180px;
      width: 180px;
      background-image: url("../../assets/images/QRcode.png");
      background-repeat: no-repeat;
      background-size: 100%;
    }
    & p:nth-child(3) {
      width: 120px;
      font-size: 12px;
      color: rgb(105, 105, 105);
    }
    & a:nth-child(4) {
      font-size: 12px;
    }
  }
}
</style>