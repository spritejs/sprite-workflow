const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  // resolve: {
  //   extensions: [ '.ts', '.js', '.json' ],
  //   alias: {
  //     '@': path.resolve(__dirname, '../src/')
  //   }
  // },
  externals: {
    spritejs: 'spritejs',
    vue: 'Vue',
    'vue-router': 'VueRouter'
  }
}
