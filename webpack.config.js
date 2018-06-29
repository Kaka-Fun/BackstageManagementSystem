/*
 * @Author: wyatt 
 * @Date: 2018-06-29 10:35:42 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-06-29 16:52:49
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: './src/app.jsx',//入口地址
  output: {             //打包输出
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
        // 处理react文件
        {
            test: /\.jsx$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                }
            }
        },
        // 处理css文件
        { 
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        },
        // 处理sass文件
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        },
        // 处理图片
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            ]
          }
    ]
  },
  plugins: [            //插件
      new HtmlWebpackPlugin({
        template: './src/index.html'     //template模板
      }),
      new ExtractTextPlugin("index.css")
    ]
};