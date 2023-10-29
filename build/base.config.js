// Define this constant for easier usage
const isProd = process.env.NODE_ENV === 'production'

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {ProvidePlugin} = require('webpack')
const config = {
    // Include source maps in development files
    devtool: isProd ? false : 'cheap-module-source-map',

    entry: {
        // Main entry point of our app
        app: resolve(__dirname, '..', 'src', 'index.js'),
    },

    output: {
        // As mentioned before, built files are stored in dist
        path: resolve(__dirname, '..', 'dist'),

        // In our case we serve assets directly from root
       // publicPath: '/',

        // We add hash to filename to avoid caching issues
        filename: '[name].[hash].js',
    },

    resolve: {
        extensions: ['*','.*', '.js'],
        modules: [
            resolve(__dirname, '..', 'node_modules'),
        ],
        alias:{
            handlebars: 'handlebars/dist/handlebars.min.js',
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',

                // Dependencies do not require transpilation
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.handlebars$/,
                loader: 'text-loader',
            },
            {
                test: /\.scss|\.sass$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type:'asset/resource'
            },
            {
                test: /\.(webm|mp4)$/,
                loader: 'file-loader',
                options: {
                    name: 'videos/[name].[hash:7].[ext]'
                }
            }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'SPA tutorial',
            template: resolve(__dirname, '..', 'src', 'html', 'index.ejs'),
        }),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery:'jquery',
            Popper: 'popper.js',

        })
    ],
}

if (!isProd) {
    config.devServer = {
        static:'./static',
        hot: true,
        devMiddleware:{
        publicPath: '/'
        },
        historyApiFallback: true,
    }
}

module.exports = config