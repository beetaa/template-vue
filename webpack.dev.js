const path = require('path')
// webpack 相关
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// vue-loader 所必须
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  // 引入以下类型文件可无需指定扩展名
  resolve: {
    extensions: ['.ts', '.vue', '.js', '.json']
  },
  entry: [
    './src/main.ts'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',  // 开放外部访问
    port: '3000',
    hot: true,  // 开启模块热替换
    contentBase: false,
    disableHostCheck: true  // 解决 Invalid Host header
  },
  module: {
    rules: [
      // 处理 vue 单文件组件
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 处理 typescript 文件
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/.vue$/]
        }
      },
      // 处理 css 文件，以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['dist']),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hello Vue.js',
      filename: 'index.html',
      template: './template.html',
      favicon: './src/assets/favicon.ico'
    })
  ]
}