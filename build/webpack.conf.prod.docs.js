const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const common = require('./webpack.conf.common')
const VueMdLoader = require('./vue-md-loader')

module.exports = merge(common, {
  entry: path.resolve(__dirname, '../demo/'),
  output: {
    path: path.join(__dirname, '../docs'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash:7].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },

      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader'
          },
          VueMdLoader
        ],
        include: path.resolve(__dirname, '../demo'),
        exclude: /node_modules/
      },

      {
        test: /\.(s)?css$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 3000,
          name: 'static/img/[name].[ext]?[hash]'
        }
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 3000,
          name: 'static/fonts/[name].[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../demo/index.html'),
      filename: 'index.html'
    })
  ]
})
