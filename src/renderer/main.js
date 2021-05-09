import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// 核心
import Initializer from "@/core/bootStrap";
// plugins 导入
import '@/core/plugins/element-ui'
import {waitInstance} from "@/core/plugins/vue-wait";

Vue.config.productionTip = false

new Vue({
  store,
  router,
  wait: waitInstance,
  created: Initializer,
  render: h => h(App)
}).$mount('#app')
