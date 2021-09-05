import * as path from 'path';
import { Configuration as WebpackConfiguration } from "webpack";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const config: WebpackConfiguration = {
    mode: 'production',
    devtool: false,
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css',
        }),
        new HtmlWebpackPlugin({
            title: '白眉居',
            favicon: path.resolve(__dirname, './assets/icon/logo.svg'),
        })
    ],
    entry: path.resolve(__dirname, 'src/frontend/webui/app.tsx'),
    output: {
        filename: '[name].[contenthash].js',
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