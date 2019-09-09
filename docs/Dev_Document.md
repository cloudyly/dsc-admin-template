# 工程结构说明
```
dsc-admin-template      --- 工程目录
|- docs
|- public
|- src
    |- assets
    |- base             工程基础
        |- api          网络请求基础封装
        |- mock         mock模拟数据基础封装
        |- router       路由基础封装
        |- store        vuex状态管理基础封装
    |- common           
    |- components       全局组件库
    |- filters          全局过滤器
    |- icons            全局图标库
    |- lang             全局语言文件
    |- modules          各个子模块
|- .editorconfig
|- .eslintrc.js
|- .gitignore
|- package.json
|- postcss.config.js
|- vue.config.js
```

# 路由配置
一级配置项说明：

| 属性名 | 类型 | Null？ | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| root | boolean |   | true | 是否在一级栏目显示 |
| hidden | boolean |   | false | 在侧边栏是否显示 |
| alwaysShow | boolean |  | false | true - 无论子路由长度为多少，侧边栏始终显示根菜单； false - 仅当子路由大于1时，才会嵌套一级二级菜单，否则只显示根菜单 |
| name | string | M |  | <keep-alive>会使用到 |
| path | string | M |  | 路由路径 |
| component | fun | M |  | 路由对应的组件 |
| children | array |  |  | 子路由 |
| meta | obj |  |  | 参考mata配置项说明 |

meta配置项说明

| 属性 | 类型 | null？ | 默认值 | 含义 |
| --- | --- | --- | --- | --- |
| title | string | M |  | 在菜单中显示的名称 |
| icon | string | M |  | 在菜单中显示的图标 |
| noCache | boolean |  | false | true-页面不会被缓存 |
|  |  |  |  |  |


配置示例：
```
  {
    path: '',
    component: Layout,
    redirect: 'core',
    children: [
      {
        path: 'core',
        component: _import('core/pages/dashboard'),
        name: 'core',
        meta: { title: 'core', icon: 'dashboard', noCache: true }
      }
    ]
  }
```
# 权限相关说明
## 路由过滤逻辑
```
判断是否有Token：
1. 有Token --> 判断目标路径是否是'/login'（登录页）：
    1.1 目标页面是登录页，则进入 主界面
    1.2 目标页面不是登录页， 判断是否获取到用户数据：
        1.2.1 没有获取到用户数据， 通过vuex发送请求获取用户数据：
            1.2.1.1 获取用户数据成功，通过vuex生成路由，并进入 目标页面
            1.2.1.2 获取用户数据失败，提示登录失败，重定向到 登录页面
        1.2.2 获取到用户数据，直接进入 目标页面
2. 没有Token， 判断目标路径是否在白名单中：
    2.1 目标页面在白名单中，直接进入 目标页面
    2.2 目标页面不在白名单中，重定向到 登录页面
```
