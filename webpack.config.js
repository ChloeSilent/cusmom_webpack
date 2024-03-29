const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';// определяет какой режим сборки
const isProd = !isDev;
const optimisation = () => {
    const config = {
        splitChunks: {chunks: 'all'}
    };
    if (isProd) {
        config.minimizer = [new OptimizeCssAssetPlugin(), new TerserWebpackPlugin()]
    }
    return config;
};

const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash]${ext}`;
const cssLoaders = (extraLoader) => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: isDev, // hot module replacement включается только в development mode
            reloadAll: true
        },
    },
        'css-loader'];
    if (extraLoader) {
        loaders.push(extraLoader)
    }
    return loaders
};

const babelOptions = (extraPreset) => {
    const config = {
        presets: ['@babel/preset-env',]
    };
    if (extraPreset) {
        config.presets.push(extraPreset);
    }
    return config;
};

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions()
        }
    ];
    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders;
};

const plugins = () => {
    const base = [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd//минификация html если билдим
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }
        ]),
        new MiniCssExtractPlugin({
            filename: fileName('css')
        })
    ];

    if(isProd) {
        base.push(new BundleAnalyzerPlugin())
    }
    return base;
};

console.log("isDev", isDev)
module.exports = {
    context: path.resolve(__dirname, 'src'),
    /*
* Режим development:
-  менее оптимизирован, чем production
- работает быстрее
- не удаляет комментарии
- предоставляет более подробные сообщения об ошибках и способы их решения
- сильно облегчает отладку

Режим production работает медленнее, чем development,
* так как ему нужно создать более оптимизированный бандл.
* Полученный JavaScript файл меньше по размеру,
* поскольку многое из режима development в нем отсутствует.*/
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.jsx'],
        analytics: './analytics.ts'
    },
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        /* все форматы, указанные здесь можно не указывать в импортах ,
         те пишем import Post from './pos.js';,а import Post from './post';*/
        extensions: ['.js', '.json'],
        /* это указание путей, например @/node_modules  */
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    /*если у нас есть библиотека, например jQuery и она используется в разных точках входа,
    * то в dist будет 2 раза загружена jquery = сайт будет медленно грузиться
    * Что бы это исзбежать используется splitChunks optimization, который вынесет такую библиотеку в vendors файл*/
    optimization: optimisation(),
    devtool: isDev ? 'source-map' : '',
    /*настройки порта для сервера*/
    devServer: {
        port: 4200,
        hot: isDev
    },
    /* Плагины — это почти то же самое, что и загрузчики, но под стероидами.
    * Они могут сделать то, что не могут загрузчики.
    * Ко всему прочему, Webpack построен на системе плагинов,
    * которые вы используете в своем файле конфигурации.
    * Плагин HTMLWebpackPlugin автоматически создает HTML-файл с уже подключенным скриптом.
    *
    * CleanWebpackPlugin, используется перед перегенерацией файлов,
    * чтобы очистить нашу папку dist/ и получить аккуратный файл с конфигурацией.
    *
    * Плагины подключаются через new Название_плагина, который был заимпортен в начале конфига
    * */
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')// Порядок выполнения перевернут (последнее выполняется первым).
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')// Порядок выполнения перевернут (последнее выполняется первым).
            }
            ,
            {
                test: /\.(png|jpg|webp|jpeg|svg|gif)$/,
                use: ['file-loader']// webpack идет с право на лево, те сначала он
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')

                }
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')

                }
            }
        ]
    }
}
