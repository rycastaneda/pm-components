// This config is used to build a vendor library
// Which is shared between all components
// Please be careful when rebuilding - as it means all apps have to be rebuild as well
//
// In order to rebuild please run `npm run build-vendor`

const vendorPlugins = require('./vendorPlugins.js');
const webpack = require('webpack');
require('babel-polyfill');

module.exports = {
    entry: {
        // create a library bundle
        vendor: vendorPlugins
    },

    output: {
        filename: '[name].bundle.js',
        path: 'dist',

        // The name of the global variable which the library's
        // require() function will be assigned to
        library: '[name]_lib'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: 'dist/[name]-manifest.json',
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]_lib'
        })
    ]
};