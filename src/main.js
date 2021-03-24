import Vue from 'vue'
import App from './App.vue'
import store from './store/store_homepage.js'
import axios from 'axios'

new Vue({
    store,
    render:h=>h(App)
}).$mount("#app")