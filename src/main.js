// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'

import App from './App'
import router from './router'
import $ from 'jquery'
import 'babel-polyfill'
import axios from 'axios'

axios.defaults.baseURL = 'http://172.16.63.109:6868';
axios.defaults.headers['Content-Type']= 'application/json';
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

// axios.interceptors.request.use(
//   config => {
//     let url = config.url
//     // get参数编码
//     if (config.method === 'get' && config.params) {
//       url += '?'
//       let keys = Object.keys(config.params)
//       for (let key of keys) {
//         url += `${key}=${encodeURIComponent(config.params[key])}&`
//       }
//       url = url.substring(0, url.length - 1)
//       config.params = {}
//     }
//     config.url = url
//     return config
//   },
//   error => {
//   return Promise.error(error)
// })
Vue.use(ElementUI)
Vue.use(Element, { size: 'small', zIndex: 3000 })

// import comData from "./js/commonData.js"
// Vue.prototype.CommonData = comData

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
