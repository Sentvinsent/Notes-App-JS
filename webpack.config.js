const path = require('path')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    entry: {
        index: ['@babel/polyfill', './src/index.js'],
        note: ['@babel/polyfill', './src/note.js']
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        }]
    },
    // plugins: [
    //     new BundleAnalyzerPlugin()
    // ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
        devMiddleware: {
            publicPath: '/scripts/'
        },
        // open: true, // To open browser automatically after running code
        hot: "only",
    }
    //,
    //devtool: 'source-map'
}

