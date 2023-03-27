module.exports = {
  configureWebpack: {
    devServer: {
      proxy: process.env.NODE_ENV !== 'production' ? {
        'api/': {
          target: ' http://localhost:3000',
        }
      } : {}
    }
  }  
}
