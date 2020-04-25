// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import adPage from './components/adPage.vue'
import VueQuillEditor from 'vue-quill-editor'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './common/css/common.scss'

Vue.use(ElementUI)
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

Vue.component('page', adPage)

Vue.prototype.$axios = axios
// 配置公共的url
axios.defaults.baseURL = 'http://127.0.0.1:8081'

// 中央事件总线
// eslint-disable-next-line no-unused-vars
let eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (to.meta.requireLogin) {
    if (user != null && user.role == 1) {
      next()
    } else {
      Vue.prototype.$message.warning('请先登陆！')
      setTimeout(() => {
        next('/login')
      }, 1000)
    }
  } else {
    next()
  }
})
