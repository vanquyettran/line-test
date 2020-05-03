const path = require('path');

function buildConfig(mode = 'development') {

    const useMinify = mode === 'production';

    const ext = useMinify ? 'min.js' : 'js';

    return {
        mode: mode,
        context: __dirname,
        entry: {
            'app': path.resolve(__dirname, './src/index.js')
        },
        output: {
            filename: `[name].${ext}`,
            chunkFilename: `[name].chunk.${ext}`,
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
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.less$/,
                    use: ['style-loader', 'css-loader', 'less-loader'],
                },
            ],
        },
        optimization: {
            minimize: useMinify,
            splitChunks: {
                chunks: 'all', // all, async
                minSize: 0,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 6,
                maxInitialRequests: 4,
                name: false,
                automaticNameDelimiter: '~',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        filename: `vendor.${ext}`
                    },
                    default: {
                        priority: -20,
                        reuseExistingChunk: true,
                        filename: `default.${ext}`
                    }
                }
            }
        },
        devtool: 'source-map'
    };

}

module.exports = buildConfig;
