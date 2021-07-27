/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',

  devtool: 'eval-cheap-module-source-map',

  entry: './src/index.ts',

  devServer: {
    port: 8080,
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        // https://webpack.js.org/guides/asset-modules/#resource-assets
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
        resourceQuery: /raw/,
        type: 'asset/source',
      },
      {
        resourceQuery: /template/,
        loader: 'html-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
    }),
  ],
}
