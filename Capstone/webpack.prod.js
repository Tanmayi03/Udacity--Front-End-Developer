const path = require('path');
const cssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ cssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                  name: 'public/[name].[ext]',
                },
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new cssExtractPlugin({
           
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,      // Enable to remove warnings about conflicting order
        }),
        new WorkboxPlugin.GenerateSW()
    ]
}