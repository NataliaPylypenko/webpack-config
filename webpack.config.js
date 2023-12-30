const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const PATHS = {
    src: path.resolve(__dirname, './src'),
    web: path.resolve(__dirname, './web')
};

module.exports  = (env) => {
    const isDev = env.mode === 'development';
    const isProd = !isDev;

    return {
        mode: env.mode ?? 'development',
        entry: {
            // module: [`${PATHS.src}/js/your-module.js`],
            common: [`${PATHS.src}/js/common.js`],
        },
        output: {
            path: PATHS.web,
            // filename: `js/[name].js`,
            filename: 'js/[name].[chunkhash].js',
            clean: true,
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
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ],
                },
            ]
        },
        plugins: [
            isProd && new MiniCssExtractPlugin({
                filename: `css/[name].[contenthash].css`,
            }),
            new HtmlWebpackPlugin({
                template: `${PATHS.src}/index.html`,
            }),
            new CopyPlugin({
                patterns: [
                    // { from: `${PATHS.src}/image`, to: `image` },
                    { from: `${PATHS.src}/static`, to: 'static' }
                ],
            }),
        ],
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? {
            port: env.port ?? 8081,
            open: true
        } : undefined,
    }
};