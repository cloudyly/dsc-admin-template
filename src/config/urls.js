import config from '@/config/index'

export default {
  core: {
    login: `${config.host.coreHost}/core/login`,
    getUserDetail: `${config.host.coreHost}/core/userDetail`
  }
}
