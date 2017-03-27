module.exports = {
    entry: './main.js',
    output: {
        path: `${__dirname}/build`,
        filename: 'scripts.js'
    },
    module: {
        loaders: [{
            include: `${__dirname}/js`,
            test: /.js$/,
            loader: 'babel-loader'
        }]
    }
};