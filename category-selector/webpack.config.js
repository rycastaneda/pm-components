const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '8080';


module.exports =  {
    context: __dirname,
    devServer: {
        contentBase: './dist',
        // do not print bundle build stats
        noInfo: true,
        // enable HMR
        hot: true,
        inline: true,
        port: PORT,
        host: HOST
    },
    devtool: 'eval',
    entry: [
        `webpack-dev-server/client?http://${HOST}:${PORT}`,
        `webpack/hot/dev-server`,
        './src/index.js'],
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
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
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    sassLoader: {
        includePaths: ['src/index']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
};