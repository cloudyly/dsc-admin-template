import Cookies from 'js-cookie'
import config from '@/config'

const TokenKey = config.tokenKeyName

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
