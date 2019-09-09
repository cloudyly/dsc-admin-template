import { logout } from '@/base/api/frame'
import { getToken, setToken, removeToken } from '@/base/permission/token-utils'
import * as coreApi from '../api/core-api'

const user = {
  state: {
    userInfo: {},
    token: getToken(),
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    /**
     * 使用用户名密码登录
     */
    login ({ commit }, userInfo) {
      const username = userInfo.mobile.trim()
      return new Promise((resolve, reject) => {
        coreApi.login({
          mobile: username,
          password: userInfo.password
        }).then(response => {
          const data = response.token
          commit('SET_TOKEN', data)
          setToken(data)
          return resolve()
        }).catch(error => {
          return reject(error)
        })
      })
    },

    /**
     * 获取用户信息
     */
    getUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        coreApi.getUserDetail().then(response => {
          const data = response
          commit('SET_ROLES', data.roles ? data.roles : { menus: [], points: [] })
          commit('SET_USER_INFO', data.userInfo)
          return resolve(response)
        }).catch(error => {
          return reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }

  }
}

export default user
