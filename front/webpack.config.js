const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
    dotenv.config();
    const FRONTEND_PORT = process.env['FRONTEND_PORT'] || '9999';
    const FILE_SERVER_PORT = process.env['FILE_SERVER_PORT'] || '9997';

    const PROD = !!(env && env['production']);

    let config =  {
        mode: 'production',
        devtool: 'source-map',
        entry: path.resolve(__dirname, 'src/index.tsx'),
        output: {
            filename: '[name].[chunkhash].bundle.js',
            chunkFilename: '[name].[chunkhash].chunk.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            publicPath: "/",
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "白眉居",
                scriptLoading: 'module',
                favicon: path.resolve(__dirname, './assets/img/favicon.png'),
            }),
            new MiniCssExtractPlugin({
                filename: `[name].[chunkhash].css`,
            }),
            new Dotenv(),
        ],
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
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        autoprefixer()
                                    ],
                                },
                            },
                        }
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                    type: 'asset',
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
            minimize: true,
            minimizer: [
                `...`,
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    toastui: {
                        test: /[\\/]node_modules[\\/](@toast-ui)[\\/]/,
                        name: 'toastui',
                        chunks: 'all',
                    },
                    antd: {
                        test: /[\\/]node_modules[\\/](antd\/es)[\\/]/,
                        name: 'antd',
                        chunks: 'all',
                    },
                    react: {
                        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                        name: 'react',
                        chunks: 'all',
                    },
                    apollo: {
                        test: /[\\/]node_modules[\\/](@apollo\/client)[\\/]/,
                        name: 'apollo',
                        chunks: 'all',
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
        },
    };
    if (!PROD) {
        const devConfig = {
            mode: 'development',
            devtool: 'inline-source-map',
            devServer: {
                port: FRONTEND_PORT,
                open: false,
                hot: true,
                static: false,
                client: {
                    progress: true,
                },
                compress: true,
                historyApiFallback: true,
                proxy: {
                    '/api/upload':{
                        target: `http://127.0.0.1:${FILE_SERVER_PORT}`,
                        pathRewrite: { '^/api/upload': '/upload' },
                    },
                },
            },
        };
        config = {...config, ...devConfig};
    }
    if (env && env['analyze']) {
        config.plugins.push(new BundleAnalyzerPlugin());
    }
    return config;
};