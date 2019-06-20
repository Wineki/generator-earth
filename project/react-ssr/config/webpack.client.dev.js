const alias = require('./_alias');

module.exports = {
    output: {
        // 注： 确保 publicPath 总是以斜杠(/)开头和结尾
        publicPath: 'http://localhost:3000/',
        // 将原来的config/filenames.js配置到这里
        filenames: {
            js: 'static/js/[name].js',
            jsChunk: 'static/js/[name].chunk.js',
            css: 'static/css/[name].css',
            img: 'static/img/[name].[hash:8].[ext]',
            media: 'static/media/[name].[hash:8].[ext]'
        }
    },
    resolve: {
        alias: alias
    }
}
