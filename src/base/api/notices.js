import { createAPI } from '../../common/request'

export const list = data => createAPI('/notices', 'get', data)
export const sassDetail = data => createAPI('/saas-clients/:id', 'get', data)
export const reviewDetail = data => createAPI('/saas-clients/:id', 'get', data)
export const performance = data => createAPI('/core/performance', 'get', data)
export const links = data => createAPI('/core/links', 'get', data)
export const addLinks = data => createAPI('/core/links', 'post', data)
