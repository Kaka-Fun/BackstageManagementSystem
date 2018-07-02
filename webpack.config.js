/*
 * @Author: wyatt 
 * @Date: 2018-06-29 10:35:42 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-06-29 16:52:49
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './src/app.jsx',//入口地址
    output: {             //打包输出
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'js/app.js'
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
                        limit: 8192,
                        name: 'resource/[name].[ext]'
                    }
                }
            ]
        },
        // 处理文字字体
        {
            test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'resource/[name].[ext]'
                    }
                }
            ]
        }

    ]
    },
    plugins: [   
        //插件 处理html文件
        new HtmlWebpackPlugin({
        template: './src/index.html'     //template模板
        }),
        // 独立css文件
        new ExtractTextPlugin("css/[name].css"),
        // 提出公告模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        })
    ],
    devServer: {
        //入口文件加上了publicPath:'/dist/',就不需要contentBase
        //contentBase: './dist'
        port: 8086
    }
};