<template>
  <div class="base-web-info">
    <div class="base-web-info-msg">
      <div>
        <a href="">{{ webInfo[0] }}</a> | <a href="">{{ webInfo[1] }}</a> |
        <a href="">{{ webInfo[2] }}</a> | <a href="">{{ webInfo[3] }}</a>
        <br/><a href="">{{ webInfo[4] }}</a> | <a href="">{{ webInfo[5] }}</a>
      </div>
      <div>
        <p>
          互联网违法不良信息举报电话：<a href="">021-34203135</a>（工作时间：每天10点-20点） |
          互联网违法不良信息举报邮箱：<a href="">tousu@mihoyo.com</a>
        </p>
        <p>
          亲爱的市民朋友，重庆警方反诈劝阻电话“<a href="">962110</a>”系专门针对避免您财产被骗受损而设，请您一旦收到来电，立即接听。
        </p>
      </div>
      <div>
        <a calss="base-web-info-licence" v-for="img of imgsurl" :key="img">
          <img :src="'../../assets/images/licence/' + img + '.png'" :alt="img" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgsurl: ["sm", "blxx", "yhxx", "whjy", "962110", "yyzz"],
      webInfo: [
        "©2012-2020",
        "重庆市石柱县筑梦科技有限公司版权所有",
        "沪公网安备31010402001113号",
        "沪ICP备19018275号-4",
        "沪网文〔2019〕3168-216",
        "增值电信业务经营许可证：沪B2-20190555",
        "互联网违法不良信息举报电话：021-34203135（工作时间：每天10点-20点）",
        "互联网违法不良信息举报邮箱：tousu@mihoyo.com",
      ],
    };
  },
};
</script>

<style lang="less">
@footer-a-hover-color: orangered;
@footer-text-hover-color: white;
.base-web-info {
  padding: 20px 0px;
  color: @footer-text-hover-color;
  background-color: rgb(31, 31, 31);
  div{
    padding:5px;
  }
}
.base-web-info-msg {
  text-align: center;
  color: @footer-text-hover-color;
  font-size: 12px;
  a {
    margin: 5px;
    font-size: 12px;
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
</style>