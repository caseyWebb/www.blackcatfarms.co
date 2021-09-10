/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

const path = require('path')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = ({ WEBPACK_SERVE }) => ({
  mode: WEBPACK_SERVE ? 'development' : 'production',

  devtool: 'source-map',

  entry: './src/index.ts',

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: [
          WEBPACK_SERVE ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.html$/i,
        loader: 'ejs-loader',
        options: { esModule: false },
      },
      {
        test: /\.svg$/i,
        type: 'asset/source',
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    ...(WEBPACK_SERVE ? [] : [new MiniCssExtractPlugin()]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: WEBPACK_SERVE === true,
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/favicon.png',
      favicons: {
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    }),
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },
})
