import Layout from '@/module-core/pages/layout'

const _import = require(`./import_${process.env.NODE_ENV === 'development' ? 'development' : 'production'}`)

/**
 * 默认定义的路由
 * @type {*[]}
 */
export const constantRouterMap = [
  {// 登录
    path: '/login',
    component: _import('core/pages/login'),
    hidden: true
  },
  {// 注册
    path: '/reg',
    component: _import('core/pages/reg'),
    hidden: true
  },
  {// 导航认证
    path: '/authredirect',
    component: _import('core/pages/authredirect'),
    hidden: true
  },
  {// 404
    path: '/404',
    component: _import('core/pages/404'),
    hidden: true
  },
  {// 401
    path: '/401',
    component: _import('core/pages/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'main',
    children: [
      {
        path: 'main',
        component: _import('core/pages/dashboard'),
        name: 'main',
        meta: { title: 'core', icon: 'dashboard', noCache: true }
      }
    ]
  }
]
