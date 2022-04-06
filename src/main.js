import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from './components/common/toast/'

Vue.config.productionTip = false

Vue.use(toast)
Vue.use(VueLazyload, {
  loading: require('@/assets/img/common/placeholder.png')
})

// 解决移动端300ms延迟
FastClick.attach(document.body)

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
