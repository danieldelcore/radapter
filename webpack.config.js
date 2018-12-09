module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        library: 'radapter',
        libraryTarget: 'umd',
        libraryExport: 'default',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                'ng-annotate-loader',
                'babel-loader',
            ],
        }],
    },
    externals: [
        'react',
        'react-dom',
        'angular',
    ],
    devtool: 'source-map',
};
