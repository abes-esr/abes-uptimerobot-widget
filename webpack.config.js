const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const WebpackAutoInject = require('webpack-auto-inject-version');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    library: 'AbesUptimerobotWidget',
    libraryExport: 'default',
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackAutoInject(),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([{ from: 'src/img', to: './img' }]), // not used
    new CopyWebpackPlugin([{ from: 'src/index.html', to: './' }]),
    new webpack.HotModuleReplacementPlugin()
  ],
  module:{
    rules:[
      {test:/\.css$/,use:['style-loader','css-loader']},
      {test:/\.html$/,use:['html-loader']},
      {test:/\.md$/,use: ["html-loader","markdown-loader"]},
      {test:/\.js$/,exclude: /node_modules/,use: {loader: 'babel-loader'}}
    ]
  }
};
