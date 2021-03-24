import Vue from 'vue'
import NewHouse from '../../components/NewHouse.vue'
import echarts from 'echarts'
//Vue.prototype.$echarts=echarts

new Vue({
    render:h=>h(NewHouse)
}).$mount("#newhouse")