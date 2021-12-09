const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,
        historyApiFallback: true,
        port: 8080,     
        overlay: {
            warnings: false,
            https: true,
            errors: true
        },
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },       
              
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
        // ,
        // new BundleAnalyzerPlugin()
    ]
})



module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
})


