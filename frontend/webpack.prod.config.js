const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');
const phaserInput = path.join(__dirname, '/node_modules/@orange-games/phaser-input/build/phaser-input.js');

module.exports = {
    cache: true,

    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'public/build'),
        publicPath: '/',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '~components': path.resolve(__dirname, './src/components'),
            '~api': path.resolve(__dirname, './src/api.js'),
            '~img': path.resolve(__dirname, './src/img'),
            '~etc': path.resolve(__dirname, './src/etc'),
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2,
            'phaser-input': phaserInput,
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    /node_modules\/react-md/,
                    /src/,
                ],
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.sass|\.scss$/,
                use: [{
                    loader: 'style-loader', // creates style nodes from JS strings
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader', // compiles Sass to CSS
                }],
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader', // creates style nodes from JS strings
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                },
                ],
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 16000, // Convert images < 16kb to base64 strings
                        name: 'images/[hash]-[name].[ext]',
                    },
                }],
            },
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: /p2\.js/, use: ['expose-loader?p2'] },
            { test: /phaser-input\.js$/, use: ['exports-loader?PhaserInput=true'] },
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            async: true,
            children: true
        }),

        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: 'src/favicon.ico'
        }),
        new BundleAnalyzerPlugin(),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
        }),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            minChunks: 2,
            name: 'common.js'
        })
    ],
};
