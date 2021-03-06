var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'bootstrap/less/bootstrap.less',
    'babel/polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel?stage=0'],
      include: path.join(__dirname, 'src')
    }, {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
    }, {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?indentedSyntax&outputStyle=expanded&' +
        "includePaths[]=" +
        (path.resolve(__dirname, "./node_modules"))
    }, {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&' +
        "includePaths[]=" +
        (path.resolve(__dirname, "./node_modules"))
    }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
    },
    { test: /\.woff\d?(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
    ]
  }
};
