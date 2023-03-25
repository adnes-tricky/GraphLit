module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        'api/': {
          target: 'https://graph-lit-server.vercel.app/',
        }
      }
    }
  }  
}