<template>
  <div class="house-card">
    <div class="card-msg">
      <a href=""><img :src="'http://localhost:8000/assets/images/resalehouse/resale ('+card.url+').jpg'" alt="houseImg" class="house-img" /></a>
      <div class="house-msg">
        <h3>
          <a href=""
            >
            <span>{{ card.area }}</span>
            <span class="msg-acreage">{{ card.acreage }}平方米</span>
            {{ card.room }}室{{card.decoration}}
            </a
          >
        </h3>
        <p class="msg-addr">
          <span class="iconfont icon-position"></span>
          地址：{{ card.area }}{{ card.street }}
          {{ card.com }}
        </p>
        <p class="msg-house">
          <span class="iconfont icon-building"></span>
          {{ card.houseage }}年 | {{ card.floor }}楼 | {{ card.room }}室 |
          {{ card.acreage }}平方米
        </p>
        <p class="msg-focus">
          <span class="iconfont icon-collect"></span>
          <span>{{ card.concern }}人关注</span> | 
          <span class="update-time">{{ card.updatetime }}发布</span>
        </p>
      </div>
    </div>
    <div class="msg-price">
      <p class="price-total"><span class="iconfont icon-price"></span> {{ card.price }}万</p>
      <p class="unit-price">
        单价{{ ((10000 * card.price) / card.acreage).toPrecision(6) }}元/平方米
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["card"],
};
</script>

<style lang="less">
@import "../../assets/font_icon/iconfont.css";

.house-card {
  h3,p,img,a,div{
  margin:0;
  padding: 0;
}
  width: 100%;
  height: 200px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  .card-msg {
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    .house-img {
      height: 200px;
      width: 240px;
    }
    .house-msg {
      height: 200px;
      margin-left:20px;
      h3{
        padding:10px 0px;
        font-size: 22px;
      }
      p {
        padding: 5px 0px;
        .iconfont{
          font-size: 32px;
        }
      }
      a {
        text-decoration: none;
        &:link {
          color: black;
        }
        &:visited {
          color: black;
        }
        &:hover {
          color: rgb(0, 132, 255);
          text-decoration: underline rgb(0, 132, 255);
          transition: all 0.3s;
        }
        &:active {
          color: black;
        }
      }
    }
  }
  .msg-price {
    height: 100%;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: end;
    .icon-price{
      font-size: 36px;
    }
    p:first-child {
      font-size: 36px;
      font-weight: bold;
    }
    p:last-child {
      font-size: 12px;
      padding:10px 0px;
    }
  }
}
</style>