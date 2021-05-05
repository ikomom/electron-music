import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// plugins 导入
import './plugins/element-ui'
import './plugins/global-use'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
