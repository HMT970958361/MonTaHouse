import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        resaleCards: [
            {
                provinces: "",
                cities: "重庆市",
                districts: "石柱县",
                street: "南宾街道",
                community: "银河天街",
                photourl: "/resalehouse/resale (1).jpg",
                price: "124万",
                area: "2室1厅·89.52平米",
            },
            {
                provinces: "",
                cities: "重庆市",
                districts: "石柱县",
                street: "万安街道",
                community: "印象东田",
                photourl: "/resalehouse/resale (2).jpg",
                price: "54万",
                area: "3室2厅·126平米",
            },
            {
                provinces: "",
                cities: "重庆市",
                districts: "石柱县",
                street: "万安街道",
                community: "城南华府",
                photourl: "/resalehouse/resale (3).jpg",
                price: "50万",
                area: "2室1厅·88平米",
            },
            {
                provinces: "",
                cities: "重庆市",
                districts: "石柱县",
                street: "晚安街道",
                community: "寰宇世家",
                photourl: "/resalehouse/resale (4).jpg",
                price: "124万",
                area: "4室2厅·140平米",
            },
        ],
        rentCards: [
            {
                provinces: "",
                cities: "重庆市",
                districts: "石柱县",
                street: "南宾街道",
                community: "银河天街",
                photourl: "/renthouse/renthouse (1).jpg",
                price: "124万",
                area: "2室1厅·89.52平米",
            },
            {
                provinces: "",
                cities: "重庆市",
                districts: "石柱县",
                street: "万安街道",
                community: "印象东田",
                photourl: "/renthouse/renthouse (2).jpg",
                price: "54万",
                area: "3室2厅·126平米",
            },
            {
                provinces: "",
                cities: "重庆市",
                districts: "石柱县",
                street: "万安街道",
                community: "城南华府",
                photourl: "/renthouse/renthouse (3).jpg",
                price: "50万",
                area: "2室1厅·88平米",
            },
            {
                provinces: "",
                cities: "重庆市",
                districts: "石柱县",
                street: "晚安街道",
                community: "寰宇世家",
                photourl: "/renthouse/renthouse (4).jpg",
                price: "124万",
                area: "4室2厅·140平米",
            },
        ],
        provinces:{
            北京: "北京市", 天津: "天津市", 河北: "河北省", 山西: "山西省", 内蒙古: "内蒙古自治区", 辽宁: "辽宁省", 吉林: "吉林省", 黑龙江: "黑龙江省", 上海: "上海市", 江苏: "江苏省", 浙江: "浙江省", 安徽: "安徽省", 福建: "福建省", 江西: "江西省", 山东: "山东省", 河南: "河南省", 湖北: "湖北省", 湖南: "湖南省", 广东: "广东省", 广西: "广西壮族自治区", 海南: "海南省", 重庆: "重庆市", 四川: "四川省", 贵州: "贵州省", 云南: "云南省", 西藏: "西藏自治区", 陕西: "陕西省", 甘肃: "甘肃省", 青海: "青海省", 宁夏: "宁夏回族自治区", 新疆: "新疆维吾尔自治区"
        },
        nowPositon: {
            province: '重庆市',
            city: '',
            area: '',
            street: '',
            com: '',
            houseType:''
        },
        
        showlogin: false,
    },
    //getters,
    mutations: {
        setProvince(state,p) {//响应mapCanvas的点击事件，切换城市
            if(p){
              for(let key in state.nowPositon)state.nowPositon[key]='';
              state.nowPositon.province=state.provinces[p];
              localStorage.setItem('province',state.nowPositon.province);
            }
            else if(localStorage.province)state.nowPositon.province=localStorage.province;
          },
    }
    //action
})
export default store