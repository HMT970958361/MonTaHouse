<template>
  <div class="map">
    <ul>
      <li class="cloose-map">
        <span @click="$emit('clooseMap')" >关闭地图</span>
      </li>
    </ul>
    <div class="map-canvas" ref="mapCanvas"></div>
  </div>
</template>


<script>
import echarts from "echarts";
//import echarts from '../../assets/js/echarts1'
import "../../assets/js/map/china";

export default {
  data() {
    return {
      provinces: [
        "shanghai",
        "hebei",
        "shanxi",
        "neimenggu",
        "liaoning",
        "jilin",
        "heilongjiang",
        "jiangsu",
        "zhejiang",
        "anhui",
        "fujian",
        "jiangxi",
        "shandong",
        "henan",
        "hubei",
        "hunan",
        "guangdong",
        "guangxi",
        "hainan",
        "sichuan",
        "guizhou",
        "yunnan",
        "xizang",
        "shanxi1",
        "gansu",
        "qinghai",
        "ningxia",
        "xinjiang",
        "beijing",
        "tianjin",
        "chongqing",
        "xianggang",
        "aomen",
      ],
      provincesText: [
        "上海",
        "河北",
        "山西",
        "内蒙古",
        "辽宁",
        "吉林",
        "黑龙江",
        "江苏",
        "浙江",
        "安徽",
        "福建",
        "江西",
        "山东",
        "河南",
        "湖北",
        "湖南",
        "广东",
        "广西",
        "海南",
        "四川",
        "贵州",
        "云南",
        "西藏",
        "陕西",
        "甘肃",
        "青海",
        "宁夏",
        "新疆",
        "北京",
        "天津",
        "重庆",
        "香港",
        "澳门",
      ],
      seriesData: [{
      name: '北京',
      value: 100
    }, {
      name: '天津',
      value: 0
    }, {
      name: '上海',
      value: 60
    }, {
      name: '重庆',
      value: 0
    }, {
      name: '河北',
      value: 60
    }, {
      name: '河南',
      value: 60
    }, {
      name: '云南',
      value: 0
    }, {
      name: '辽宁',
      value: 0
    }, {
      name: '黑龙江',
      value: 0
    }, {
      name: '湖南',
      value: 60
    }, {
      name: '安徽',
      value: 0
    }, {
      name: '山东',
      value: 60
    }, {
      name: '新疆',
      value: 0
    }, {
      name: '江苏',
      value: 0
    }, {
      name: '浙江',
      value: 0
    }, {
      name: '江西',
      value: 0
    }, {
      name: '湖北',
      value: 60
    }, {
      name: '广西',
      value: 60
    }, {
      name: '甘肃',
      value: 0
    }, {
      name: '山西',
      value: 60
    }, {
      name: '内蒙古',
      value: 0
    }, {
      name: '陕西',
      value: 0
    }, {
      name: '吉林',
      value: 0
    }, {
      name: '福建',
      value: 0
    }, {
      name: '贵州',
      value: 0
    }, {
      name: '广东',
      value: 597
    }, {
      name: '青海',
      value: 0
    }, {
      name: '西藏',
      value: 0
    }, {
      name: '四川',
      value: 60
    }, {
      name: '宁夏',
      value: 0
    }, {
      name: '海南',
      value: 60
    }, {
      name: '台湾',
      value: 0
    }, {
      name: '香港',
      value: 0
    }, {
      name: '澳门',
      value: 0
      }],
    };
  },
  mounted() {
    this.initmap("china", "筑梦家全国房源地图");
  },
  methods: {
    initmap: function (pName, Chinese_) {
      //let map=echarts.init(document.getElementById('mapCanvas'));
      let map = echarts.init(this.$refs.mapCanvas);
      let tmpSeriesData = pName === "china" ? this.seriesData : [];
      let option = {
        title: {
          text: Chinese_ || pName,
          left: "center",
          areaColor: "#FFF",
          padding: 100,
          textStyle: { fontSize: 28, fontWeight: "bolder", color: "#FFF" },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c} (p / km2)",
        },
        series: [
          {
            name: Chinese_ || pName,
            type: "map",
            map: pName,//省份时需要是中文
            roam: true, //是否开启鼠标缩放和平移漫游
            data: tmpSeriesData,
            top: "80px", //组件距离容器的距离
            zoom: 1.1,
            selectedMode: "single",
            label: {
              normal: {
                show: true, //显示省份标签
                textStyle: { color: "#d9d9d9" }, //省份标签字体颜色
              },
              emphasis: {
                //对应的鼠标悬浮效果
                show: true,
                textStyle: { color: "#FFF" },
              },
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5, //区域边框宽度
                borderColor: "#02c5fd", //区域边框颜色
                areaColor: "#005289", //区域颜色
              },
              emphasis: {
                borderWidth: 0.5,
                borderColor: "#18a0fb", //区域边框颜色
                areaColor: "#d9d9d9", //区域颜色
              },
            },
          }
        ],
      };
      map.setOption(option);
      map.off("click");
      var that=this;//map.on时指向改变
      if (pName === "china") {
        // 全国时，添加click 进入省级
        map.on("click", function (param) {
          that.$emit('clooseMap',param.name);
        });
      }
    },
    // showProvince:function (pName, Chinese_) {//切换到省份时加载对应js
    //   console.log(Chinese_)
    //   let script=document.createElement('script');
    //   script.type='text/javascript';
    //   //script.async = true;
    //   script.src='../../assets/js/map/province/'+pName+'.js';
    //   script.id=pName;
    //   document.getElementsByTagName("body")[0].appendChild(script);
    //   this.initmap(Chinese_);
    // }
  },
};
</script>

<style lang="less">
.map {
  background-color: rgba(0, 0, 0, 0.8);
  div,
  span {
    margin: 0;
    padding: 0;
  }
  ul{
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: 20px;
    left: 100px;
  }
  .cloose-map {
    margin:20px;
    padding: 20px;
    z-index: 11;
    font-size: 20px;
    font-weight: bold;
    background-color: rgb(70, 70, 70);
    color: white;
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
      background-color: black;
    }
  }
  .map-canvas {
    width: 1440px;
    height: 900px;
    margin: 0 auto;
  }
}
</style>