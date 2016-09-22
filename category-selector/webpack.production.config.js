const webpack = require('webpack');
const loaders = require('./webpack.loaders.js');

module.exports = {
    entry: [
        './src/index.js'
    ],
    devtool: 'cheap-module-source-map',
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
};