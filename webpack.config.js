const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.resolve(__dirname, './src'),
    web: path.resolve(__dirname, './web')
};

module.exports = {
    // mode: 'development',
    entry: './src/index.js',
    output: {
        path: PATHS.web,
        filename: 'my-first-webpack.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.((c|sa|sc)ss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    "css-loader",
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `styles.css`,
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        })
    ],
    devServer: {
        port: 8081
    },
};