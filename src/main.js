// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import adPage from './components/adPage.vue'
import VueQuillEditor from 'vue-quill-editor'
import 'element-ui/lib/theme-chalk/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './assets/style/common.scss'

Vue.use(ElementUI)
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

Vue.component('page', adPage)

Vue.prototype.$toPage = function (val, obj) {
  let self = this
  if (typeof val == 'object') {
    obj = val
    val = self.$router.path
  }
  setTimeout(function () {
    self.$router.push({
      path: val,
      query: obj || {}
    })
  }, 0)
}

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
