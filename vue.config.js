module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
      proxy: { // 配置代理信息
          '/api': {
              target: 'http://127.0.0.1:7001',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/api': '/'
              }
          }
      }
  }
}