import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '../permission/token-utils'

const instance = axios.create({
  timeout: 5000 // request timeout
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    Message.error('请求失败，请刷新页面后重试')
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    Message({
      // message: error.message,
      message: `${error.response.data.msg}(${error.response.data.code})`,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export const createAPI = (url, method, data) => {
  let config = {}
  if (method === 'get') {
    config.params = data
  } else {
    config.data = data || {}
  }
  return instance({
    url,
    method,
    ...config
  })
}

export const get = (url, data) => createAPI(url, 'get', data)
export const post = (url, data) => createAPI(url, 'post', data)
export const put = (url, data) => createAPI(url, 'put', data)
export const del = (url, data) => createAPI(url, 'delete', data)

export const createFormAPI = (url, method, data) => {
  let config = {
    data: data,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  config.responseType = 'json'
  config.transformRequest = [
    function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return instance({
    url,
    method,
    ...config
  })
}
export const createImgAPI = (url, method, data) => {
  let config = {}
  config.data = data
  config.headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  config.responseType = 'blob'
  config.transformRequest = [
    function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ]
  return instance({
    url,
    method,
    ...config
  })
}
