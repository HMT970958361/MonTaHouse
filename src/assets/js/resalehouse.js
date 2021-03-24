import Vue from 'vue'
import ResaleHouse from '../../components/ResaleHouse.vue'
import store from '../../store/store_resalehouse.js'
import echarts from 'echarts'
Vue.prototype.$echarts=echarts;
new Vue({
    store,
    render:h=>h(ResaleHouse)
}).$mount("#resalehouse")