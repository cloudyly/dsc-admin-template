const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const BASE_URL = process.env.NODE_ENV === 'development' ? './' : './'

module.exports = {
  publicPath: BASE_URL,
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: false,
  /*
  devServer: {
    port: 8088,
    // proxy: 'http://localhost:31001'
    proxy: {
      '/api': {
        target: 'http://localhost:31001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/courseApi': {
        target: 'http://localhost:31200',
        changeOrigin: true,
        pathRewrite: {
          '^/courseApi': '/'
        }
      }
    }
  },
   */
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
    config.module.rules.delete('svg')
    config.module.rule('svg-smart')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
