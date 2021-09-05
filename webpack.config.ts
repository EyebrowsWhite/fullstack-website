import * as path from 'path';
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const DEV = 'dev';

const config: Configuration = {
    mode: `development`,
    devtool: `inline-source-map`,
    devServer: {
        port: 7777,
        compress: true,
        hot: true,
        open: true,
        static: false,
        historyApiFallback: true,
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: `${DEV}.[contenthash].css`,
        }),
        new HtmlWebpackPlugin({
            title: '白眉居',
            favicon: path.resolve(__dirname, './assets/icon/logo.svg'),
        })
    ],
    entry: path.resolve(__dirname, 'src/frontend/webui/app.tsx'),
    output: {
        filename: `${DEV}.[contenthash].js`,
        path: path.resolve(__dirname, './build'),
        clean: true,
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vender: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
  };
  
  export default config;