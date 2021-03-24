var path = require('path')
const {
  VueLoaderPlugin //该插件需要{}括起来
} = require('vue-loader') //导入写vue-loader
const { //该插件需要{}括起来
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const webpack = require('webpack');

module.exports = {
  entry: {
    main:path.resolve(__dirname,'../src/main.js'),
    //newhouse:path.resolve(__dirname,'../src/assets/js/newhouse.js'),
    resalehouse:path.resolve(__dirname,'../src/assets/js/resalehouse.js'),
    //renthouse:path.resolve(__dirname,'../src/assets/js/renthouse.js'),
    login:path.resolve(__dirname,'../src/assets/js/login.js')
  },
  output: {
    //path.reslove相当于在给定目录下执行cd操作
    path: path.resolve(__dirname, '../dist'),
    filename: './assets/js/[name].js',
  },
  // optimization:{
  //   splitChunks:{chunks:'all'}
  // },
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    contentBase: './dist',//相对于根目录
    host:'localhost',
    port: 8000,
    hot: true, //是否开启HMR
    open:true,
    openPage:'index.html',//运行npm run start时Cannot GET /问题解决
    index:'index.html'
    //overlay: true //是否在浏览器中显示错误
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      { //npm @babel/core @babel/preset-env babel-loader
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader' //注意安装babel-loader
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'style-loader', //注意添加该项
          'css-loader' //css-loader只解析.css里的css代码
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'style-loader', //注意添加使用该项
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'http://localhost:8000/assets/images',
            outputPath: '../dist/assets/images',
            esModule: false //src路径错误输出为[object-module]的解决方法
          }
        }]
      },
      {
        test: /\.(mp4)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'http://localhost:8000/assets/video',
            outputPath: '../dist/assets/video',
            esModule: false //src路径错误输出为[object-module]的解决方法
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        loader: 'file-loader'
      }          
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    //new CleanWebpackPlugin(), //每次build自动清除旧文件
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:path.resolve(__dirname,'../index.html'),
      inject:true,
      chunks:['main']
    }),
    new HtmlWebpackPlugin({
      filename:'resalehouse.html',
      template:path.resolve(__dirname,'../src/assets/page/resalehouse.html'),
      inject:true,
      chunks:['resalehouse']
    }),
    new HtmlWebpackPlugin({
      filename:'login.html',
      template:path.resolve(__dirname,'../src/assets/page/login.html'),
      inject:true,
      chunks:['login']
    })
  ]
}