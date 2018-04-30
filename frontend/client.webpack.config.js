const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
})

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'public/build'),
        publicPath: '/',
        filename: '[name].js',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '~components': path.resolve(__dirname, './src/components'),
            '~api': path.resolve(__dirname, './src/api.js'),
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2,
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
        ],
    },
    devServer: {
        port: 3030,
        contentBase: path.join(__dirname, 'public'),
        disableHostCheck: true,
        historyApiFallback: true,
        hot: true,
        hotOnly: true,
        inline: true,
        open: true,
        openPage: '',
        overlay: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            files: {
                js: ['main.js'],
            },
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./public/build/vendor-manifest.json'),
        })
    ],
};
