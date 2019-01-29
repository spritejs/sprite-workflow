const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const common = require('./webpack.conf.common')
const VueMdLoader = require('./vue-md-loader')

module.exports = merge(common, {
  entry: path.resolve(__dirname, '../demo/'),
  devServer: {
    contentBase: path.join(__dirname, '../demo'),
    compress: true,
    hot: true,
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          failOnError: true,
          quiet: true
        },
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/
      },

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
        use: ['style-loader', 'css-loader', 'sass-loader']
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin([/\.d\.ts$/]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../demo/index.html'),
      filename: 'index.html'
    })
  ]
})
