const developmentHost = '/api'
const productHost = 'http://localhost:31001'

const courseDevelopHost = '/courseApi'
// const courseDevelopHost = 'http://localhost:31200'
const courseProductHost = 'http://localhost:31200'

const config = {
  isMock: true,
  host: developmentHost,
  courseHost: courseDevelopHost
}

switch (process.env.NODE_ENV) {
  case 'development':
    config.host = developmentHost
    config.courseHost = courseDevelopHost
    break
  case 'production':
    config.host = productHost
    config.courseHost = courseProductHost
    break
}

config.api = {
  common: {
    test: 'test'
  },
  sys: {
    dictionaryByType: config.host + '/sys/dictionary/get'
  },
  cms: {
    pageList: config.host + '/page/list',
    pageAdd: config.host + '/page',
    pageById: config.host + '/page',
    pageUpdate: config.host + '/page',
    pageDelete: config.host + '/page',
    pagePost: config.host + '/page/post',
    templateList: config.host + '/template/list',
    template: config.host + '/template'
  },
  course: {
    categoryList: config.courseHost + '/category/list',
    courseList: config.courseHost + '/course/list',
    courseBaseAdd: config.courseHost + '/course/base',
    courseBaseById: config.courseHost + '/course/base',
    courseBaseUpdate: config.courseHost + '/course/base',
    courseMarketById: config.courseHost + '/course/market',
    courseMarketUpdate: config.courseHost + '/course/market',
    teachPlanList: config.courseHost + '/teachplan/list',
    teachPlanAdd: config.courseHost + '/teachplan'
  }
}

export default config
