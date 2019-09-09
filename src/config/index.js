
const devHost = {
  host: '/api', // 网关
  coreHost: '/coreApi', // 核心模块
  xxxHost: '/xxxApi' // 其他业务模块
}
const sitHost = {
  host: '/api', // 网关
  coreHost: '/coreApi', // 核心模块
  xxxHost: '/xxxApi' // 其他业务模块
}
const uatHost = {
  host: '/api', // 网关
  coreHost: '/coreApi', // 核心模块
  xxxHost: '/xxxApi' // 其他业务模块
}
const prodHost = {
  host: 'http://localhost:8080', // 网关
  coreHost: 'http://localhost:8080', // 核心模块
  xxxHost: 'http://localhost:8080' // 其他业务模块
}

/**
 * 定义系统业务相关的配置
 */
const config = {
  isMock: true,
  host: { ...devHost },
  /**
   * 路由的白名单
   */
  whiteList: [
    '/login',
    '/reg',
    '/authredirect'
  ],
  tokenKeyName: 'DSC-Admin-Token'
}

switch (process.env.NODE_ENV) {
  case 'development':
    config.host = { ...devHost }
    break
  case 'sit':
    config.host = { ...sitHost }
    break
  case 'uat':
    config.host = { ...uatHost }
    break
  case 'production':
    config.host = { ...prodHost }
    break
}

export default config
