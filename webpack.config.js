const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin')

let babelConf;
if (fs.existsSync('./.babelrc')) {
  // use babel
  babelConf = JSON.parse(fs.readFileSync('.babelrc'));
}

module.exports = function (env = {}) {
  const externals = {};

  return {
    mode: 'development',
    entry: './example/test',
    devtool: 'inline-source-map',

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: babelConf,
          },
        },
      ]
    },
    stats: 'errors-only',

    devServer: {
      contentBase: path.join(__dirname, 'example'),
      compress: true,
      port: 9092,
      hot: true,
      host: '0.0.0.0'
    },

    plugins: [
      new HTMLPlugin({
        filename: 'main',
        template: './example/test.html',
        inject: false
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};