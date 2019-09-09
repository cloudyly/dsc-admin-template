import Layout from '@/module-core/pages/layout'

const _import = require('@/base/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/demo',
    component: Layout,
    redirect: 'noredirect',
    name: 'demo',
    meta: {
      title: 'demo业务模块管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('demo/pages/index'),
        name: 'demo-index',
        meta: { title: 'demo业务模块', icon: 'component', noCache: true }
      }
    ]
  }
]
