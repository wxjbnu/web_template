// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


// Vue.use(ElementUI)
Vue.use(MintUI)

Vue.config.productionTip = false

// 获取当前环境
store.commit('GET_USERAGENT', {})
// 在微信里面需要注入jssdk
// if (store.state.userAgent === 'weChat') {
//   store.dispatch('initWeixin')
// }

// store.commit('GET_USERAGENT')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
