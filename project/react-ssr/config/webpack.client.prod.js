const alias = require('./_alias');

module.exports = {
    output: {
        // 注： 确保 publicPath 总是以斜杠(/)开头和结尾
        publicPath: 'http://jrcdn.com.con/xxx/projectName',
        // 将原来的config/filenames.js配置到这里
        filenames: {
            js: 'static/js/[name].[chunkhash:8].js',
            jsChunk: 'static/js/[name].[chunkhash:8].chunk.js',
            css: 'static/css/[name].[contenthash:8].css',
            img: 'static/img/[name].[hash:8].[ext]',
            media: 'static/media/[name].[hash:8].[ext]'
        }
    },
    resolve: {
        alias: alias
    }
}
