const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    filename: 'http-client.min.js',
    path: path.resolve(__dirname, 'dist'),
    hashFunction: "sha256",
  },
  optimization: {
    minimize: true
  },
};
