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
        resolve: {
            alias: {
                '@': PATHS.src,
                '@assets': `${PATHS.src}/assets`,
            }
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
                {
                    test: /\.(png|svg|webp|jpe?g|gif)$/,
                    type: 'asset/resource',
                },
            ]
        },
        optimization: {
            splitChunks: {
                // include all types of chunks
                chunks: 'all',
            },
        },
        plugins: [
            isProd && new MiniCssExtractPlugin({
                filename: `css/[name].[contenthash].css`,
            }),
            new HtmlWebpackPlugin({
                title: "Webpack Config",
                template: `${PATHS.src}/index.html`,
                // favicon: `${PATHS.src}/assets/favicon.ico`,
                minify: {
                    collapseWhitespace: isProd,
                }
            }),
            new CopyPlugin({
                patterns: [
                    { from: `${PATHS.src}/image`, to: `image` },
                    { from: `${PATHS.src}/assets`, to: 'assets' },
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