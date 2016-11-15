const vendorPlugins = require('../shared/vendorPlugins.js');
var webpack = require('webpack');

module.exports = {
    entry: {
        // create two library bundles, one with jQuery and
        // another with Angular and related libraries
        vendor: vendorPlugins
    },

    output: {
        filename: '[name].bundle.js',
        path: '../shared/dist',

        // The name of the global variable which the library's
        // require() function will be assigned to
        library: '[name]',
    },

    plugins: [
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: '../shared/[name]-manifest.json',
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]'
        }),
    ],
}