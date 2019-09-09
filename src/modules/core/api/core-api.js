import { get, post } from '@/base/api'
import urls from '@/config/urls'

export const login = data => post(urls.core.login, data)
export const getUserDetail = data => get(urls.core.getUserDetail, data)
