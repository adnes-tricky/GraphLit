module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        'api/': {
          target: 'https://graph-lit.vercel.app/',
        }
      }
    }
  }  
}