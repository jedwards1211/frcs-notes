var webpack = require('webpack');
var config = require('./webpack.config');
var _ = require('lodash');

module.exports = _.assign({}, config, {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
  ].concat(config.entry),
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
});