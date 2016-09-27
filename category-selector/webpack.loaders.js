module.exports = [
    {
        test: /\.js/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: 'babel'
    },
    {
        test: /\.json$/,
        loader: 'json'
    }
];