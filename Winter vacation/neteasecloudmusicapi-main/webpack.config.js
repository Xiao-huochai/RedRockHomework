// const path = require('path');

// module.exports = {
//     mode: 'development' || 'production',
//     entry: "./js/search.js",
//     output: {
//         filename: "bundle.js",
//         path: path.resolve(__dirname, "./dist"),
//         clean: true
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader'],
//             },
//             {
//                 test: /\.js$/,
//                 use: [
//                     'babel-loader'
//                 ],
//                 exclude: '/node_modules',
//             }
//         ],
//     },
// }

const path = require("path");
const { merge } = require("webpack-merge");
const devConfig = require("./webpack.dev.js");
const prodConfig = require("./webpack.prod.js");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = {
    entry: "./js/search.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: "/node_modules/",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "webpack 案例",
            template: './html/main.html',
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "/dist"),
        },
        port: 3000,
        hot: true,
        open: false,
    },
};

//  将配置导出为函数
module.exports = (env) => {
    if (env && env.production) {
        return merge(commonConfig, prodConfig);
    } else {
        return merge(commonConfig, devConfig);
    }
};
