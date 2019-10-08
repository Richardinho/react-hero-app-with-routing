const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, "docs"),
    publicPath: 'https://richardinho.github.io/react-hero-app-with-routing/'
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
        test: /\.js/,
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
  ],
};
