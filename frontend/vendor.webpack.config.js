const webpack = require('webpack');
const path = require('path');

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    cache: true,
    entry: {
        vendor: [
            'pixi',
            'p2',
            'phaser',
            'webfontloader',
            'react',
            'react-dom'
        ],
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        },
    },
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: 'vendor.bundle.js',
        pathinfo: true,
        library: 'vendor',
    },
    module: {
        rules: [
            {
                test: /pixi\.js/,
                use: ['expose-loader?PIXI']
            },
            {
                test: /phaser-split\.js$/,
                use: ['expose-loader?Phaser']
            },
            {
                test: /p2\.js/,
                use: ['expose-loader?p2']
            }
        ]
    },
    plugins: [new webpack.DllPlugin({
        path: path.join(__dirname, 'public/build/vendor-manifest.json'),
        name: 'vendor',
        context: __dirname,
    })]
};