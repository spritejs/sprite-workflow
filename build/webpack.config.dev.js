const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin')

let babelConf;
if (fs.existsSync('../.babelrc')) {
  // use babel
  babelConf = JSON.parse(fs.readFileSync('../.babelrc'));
}

module.exports = function (env = {}) {
  // const externals = {};
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
      'sprite-workflow': path.resolve(__dirname, '../src/index'),
      'test': path.resolve(__dirname, '../example/test.js')
    },
    output: {
      path: path.resolve(__dirname, '/'),
      filename: '[name].js',
      library: 'spriteWorkflow',
      libraryTarget: 'umd'
    },
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
    // stats: 'errors-only',

    devServer: {
      contentBase: path.join(__dirname, '../example'),
      compress: true,
      port: 3001,
      hot: true,
      host: '0.0.0.0'
    },

    plugins: [
      // new HTMLPlugin({
      //   //filename: 'spriteWorkflow',
      //   template: '../example/test.html',
      //   inject: false
      // }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    externals: {
      spritejs: 'spritejs'
    }
  };
};
