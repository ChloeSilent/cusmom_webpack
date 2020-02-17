const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']// webpack идет с право на лево, те сначала он
            },
            {
                test: /\.(png|jpg|webp|jpeg|svg|gif)$/,
                use: ['file-loader']// webpack идет с право на лево, те сначала он
            },
            {
                test:/\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test:/\.xml$/,
                use: ['xml-loader']
            },
            {
                test:/\.csv$/,
                use: ['csv-loader']
            }
        ]
    }
}
