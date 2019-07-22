const path = require('path');
const fs = require('fs');

let babelConf;
if (fs.existsSync('../.babelrc')) {
  // use babel
  babelConf = JSON.parse(fs.readFileSync('../.babelrc'));
}

module.exports = function (env = {}) {
  return {
    mode: 'production',
    devtool: 'source-map',
    entry: {
      index: path.resolve(__dirname, '../src/index.js')
    },
    output: {
      path: path.resolve(__dirname, '../lib'),
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
    externals: {
      spritejs: {
        root: 'spritejs',
        commonjs2: 'spritejs/dist/spritejs.min.js',
        commonjs: 'spritejs/dist/spritejs.min.js',
        amd: 'spritejs',
        umd: 'spritejs'
      }
    }
  };
}
