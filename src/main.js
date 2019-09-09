import Vue from 'vue'
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/index.scss'

import App from './App.vue'
import router from './base/router'
import store from './base/store'
import i18n from './lang'
import './icons'
import * as filters from './filters'
import tools from './common/common'

import './base/mock'

/** 注册各个业务模块 BEGIN */
import moduleCore from './module-core'
import moduleDemo from './module-demo'
Vue.use(moduleCore, store)
Vue.use(moduleDemo, store)
/** 注册各个业务模块 END */

Vue.prototype.$tools = tools
Vue.use(tools)

Vue.use(Element, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
