import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/common/common.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "@/mock/mock"
import "@/router/permission"
import * as echarts from "echarts"
Vue.use(ElementUI)
Vue.prototype.$echarts=echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
