const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'

const optimization = () => {
    const config = {
        minimize: !isDev,
        splitChunks: {
            chunks: "all"
        }
    }
    if (!isDev) {
        config.minimizer = [
            new TerserPlugin(),
            new OptimizeCssAssetsPlugin()
        ]
    }

    return config

}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash]${ext}`

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',

  entry: './main.js',
  
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },

  devServer: {
      port: 9400,
      hot: isDev
  },
  devtool: isDev ? 'source-map': '',
  plugins: [
      new HtmlWebpackPlugin({
          template: './index.html',
          minify: {
              collapseWhitespace: !isDev
          }
      }),
      new CleanWebpackPlugin(),
      new CopyPlugin({
          patterns: [
              {
                  from: path.resolve(__dirname, 'src/static/'),
                  to: path.resolve(__dirname, 'dist/static/')
              },
              {
                  from: path.resolve(__dirname, 'src/img/'),
                  to: path.resolve(__dirname, 'dist/img/')
              }
          ]
      }),
      new MiniCssExtractPlugin({
          filename: filename('css'),
      })
    ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader','css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: '/iconfont'
                }
              }
             ]
      }
    ]
  }
};