import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import store from '../store'
import { getToken } from '../permission/token-utils'
import config from '@/config'
import { constantRouterMap } from './constant-router'

export { constantRouterMap }

Vue.use(Router)

NProgress.configure({ showSpinner: false })

/**
 * 配置路由
 **/
let router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

/**
 * 白名单 无需跳转
 */
const whiteList = config.whiteList

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 先判断是否有Token
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      // if current page is dashboard will not trigger afterEach hook, so manually handle it
      NProgress.done()
    } else {
      // 判断当前用户是否已获取到user_info信息
      if (store.getters.roles.length === 0) {
        store.dispatch('getUserInfo').then(resp => {
          const roles = resp.roles // 角色是一个数组，类似 ['editor','develop']
          store.dispatch('generateRoutes', { roles }).then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败, 请重新登录')
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    // 没有Token，先判断是否在白名单中
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

/**
 * 导出 基础路由
 **/
export default router

/**
 * 导出 业务路由
 **/
export let asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
