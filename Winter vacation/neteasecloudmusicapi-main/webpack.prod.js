// webpack.prod.js
module.exports = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
    },
}