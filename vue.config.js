const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
  // 配置别名
  /* configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common'
      }
    }
  } */
})
