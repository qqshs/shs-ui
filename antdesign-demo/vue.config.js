var webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
    productionSourceMap: false,
    publicPath: './',
    chainWebpack: config => {
        config.plugin('ignore')
            .use(new webpack.ContextReplacementPlugin(
                /moment[/\\]locale$/,
                /zh_CN/,
                /en_US/,
            ));//忽略/moment/locale下的所有文件
    },
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
                        threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
                        deleteOriginalAssets: true // 是否删除原文件
                    })
                ]
            }
        }
    }

}