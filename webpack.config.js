const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

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
        main: './index.js',
        analytics: './analytics.js'
    },
    output: {
        filename: '[name].[contenthash].js',
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
    optimization: {
        splitChunks:{ chunks: 'all'}
    },
    /* Плагины — это почти то же самое, что и загрузчики, но под стероидами.
    * Они могут сделать то, что не могут загрузчики.
    * Ко всему прочему, Webpack построен на системе плагинов,
    * которые вы используете в своем файле конфигурации.
    * Плагин HTMLWebpackPlugin автоматически создает HTML-файл с уже подключенным скриптом.
    *
    * CleanWebpackPlugin, используется перед перегенерацией файлов,
    * чтобы очистить нашу папку dist/ и получить аккуратный файл с конфигурацией.
    * */
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']// Порядок выполнения перевернут (последнее выполняется первым).
            },
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
            }
        ]
    }
}
