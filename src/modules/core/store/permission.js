import { asyncRouterMap, constantRouterMap } from '@/base/router'
// import { hasPermission } from '@/common/permission'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
/*
function filterAsyncRouter (asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      return true
    }
    return false
  })
  return accessedRouters
}
*/

const permission = {
  state: {
    /**
     * 基础路由：如登录、404之类
     */
    routers: constantRouterMap,
    /**
     * 动态添加的路由
     */
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    generateRoutes ({ commit }, data) {
      console.log('generateRoutes')
      return new Promise(resolve => {
        // const { roles } = data
        // 动态构造权限列表
        // let accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // commit('SET_ROUTERS', accessedRouters)
        commit('SET_ROUTERS', asyncRouterMap) // 调试开启全部路由
        resolve()
      })
    }
  }
}

export default permission
