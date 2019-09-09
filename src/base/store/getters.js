// 手动添加需要的 快捷 getters
const getters = {
  addRouters: state => state.permission.addRouters,
  roles: state => state.user.roles,
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  errorLogs: state => state.errorLog.logs,
  approvals: state => state.user.approvals // 审核设置
}

export default getters
