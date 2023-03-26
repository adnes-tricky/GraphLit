module.exports = {
  configureWebpack: {
    proxy: {
      'api/': {
        target: 'https://graph-lit-server.vercel.app/', // replace with appropriate URL
      }
    }
  }  
}