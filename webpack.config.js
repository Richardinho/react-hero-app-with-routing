const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const path = require('path');

module.exports = {
  entry:[
    'react-hot-loader/patch', 
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
         test: /\.css$/,
         use: [
          { loader: 'style-loader'},
          { loader: 'css-loader'},
         ]
      },
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'January experiments',
      template: 'index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
