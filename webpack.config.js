const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// подключаем плагин
const isDev = process.env.NODE_ENV === 'development';
// создаем переменную для development-сборки


module.exports = {
    entry: { 
        main: './src/js/index.js', 
        articles: './src/js/articles.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/[name].[chunkhash].js'
        },
        module: {
            rules: [
                
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 
                        {
                            loader: "babel-loader"
                        }
                },
               {
                    test: /\.(png|jpe?g|gif|ico|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[hash].[ext]',
                                publicPath: '/',
                                /*esModule: false*/
                            }
                        },
                      {
                        loader: 'image-webpack-loader',
                        options: {}
                      },
                    ]
                },
               /* {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: { publicPath: '/'},
                }, */
                /*{
                    test: /\.(png|jpg|gif|ico|svg)$/i,
                    use: [
                        'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                        {
                            loader: 'image-webpack-loader',
                        },
                    ]
                },*/

                {
                    test: /\.css$/i,
                    use: 
                        [
                            /*isDev ? { loader:'style-loader' } : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../'} },*/
                           {
                               loader : MiniCssExtractPlugin.loader, options: { publicPath: './'},
                           },  
                           'css-loader', 
                            'postcss-loader'
                        ]
                },

                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    loader: 'file-loader?name=./vendor/[name].[ext]'
                }       
            ]
        },
        
        plugins: [ 
            new MiniCssExtractPlugin({filename: '[name]/[name].[contenthash].css'}),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                        preset: ['default'],
                },
                canPrint: true
            }), 
            new HtmlWebpackPlugin({
                inject: false,
                hash: true,
                template: './src/index.html',
                filename: 'index.html',
                chunks: ['main'],
            }),
            new HtmlWebpackPlugin({
                inject: false,
                hash: true,
                template: './src/pages/articles.html',
                filename: 'articles/index.html',
                chunks: ['articles'],
            }),
            new WebpackMd5Hash(),
            new webpack.DefinePlugin({'NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),

        ]
};