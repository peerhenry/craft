const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@c': path.resolve(__dirname, 'src/components/'),
      },
    },
  },
}
