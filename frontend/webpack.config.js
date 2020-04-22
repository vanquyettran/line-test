const path = require('path');

module.exports = {
    mode: 'production',
    context: __dirname,
    entry: {
        'app': path.resolve(__dirname, './src/index.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../public/bundles/'),
        publicPath: 'bundles/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
        ],
    },
    optimization: {
        minimize: false
    },
    devtool: 'source-map'
};