module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        library: 'radapter',
        libraryTarget: 'umd',
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
