const path = require('path');

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        library: 'radapter',
        libraryTarget: 'umd2',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            },
        }],
    },
    externals: [
        'react',
        'react-dom',
        'angular',
    ],
};
