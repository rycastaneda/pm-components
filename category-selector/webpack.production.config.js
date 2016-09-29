const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const vendorPlugins = require('../shared/vendorPlugins.js');

module.exports = {
    entry: {
        app: './src/index.js',
        vendor: vendorPlugins
    },
    devtool: 'cheap-module-source-map',
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components|dist)/,
                loader: 'babel'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style', // The backup style loader
                    'css?sourceMap!sass?sourceMap'
                )
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('./index.css'),
        new webpack.optimize.CommonsChunkPlugin('vendor', '../../shared/dist/vendor.bundle.js')
    ]
};