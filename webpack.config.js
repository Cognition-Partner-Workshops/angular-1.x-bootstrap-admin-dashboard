'use strict';
var path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src/app/pages/ui/react/index.jsx'),
  output: {
    path: path.join(__dirname, 'src/app/pages/ui/react'),
    filename: 'ui-bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
      }
    }]
  },
  resolve: { extensions: ['.js', '.jsx'] },
  externals: { angular: 'angular' }
};
