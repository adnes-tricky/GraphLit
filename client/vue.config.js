module.exports = {
  configureWebpack: {
    devServer: {
      proxy: process.env.NODE_ENV !== 'production' ? {
        'api/': {
          target: 'https://graph-lit-server.vercel.app/',
        }
      } : {}
    }
  }  
}
