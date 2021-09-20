const Path = require('path');
const Webpack = require('webpack');

module.exports = {
    entry: './dist/npm/module.js',

    output: {
        filename: 'stanza.browser.js',
        library: 'XMPP',
        libraryTarget: 'window',
        path: Path.resolve('dist')
    },

    plugins: [
        new Webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser.js'
        })
    ]
};