const filenames = require('./filenames').prod;
const alias = require('./alias');

module.exports = {
    output: {
        // 统一配置资源cdn
        publicPath: '//j1.cdn.com',
        // 预发布 测试
        // publicPath: '.',
        // 分别配置资源cdn
        // publicPath: {
        //     js: 'http://j1.cdn.com',
        //     css: 'http://c1.cdn.com',
        //     img: 'http://img1.cdn.com',
        //     media: 'http://static.cdn.com/media/'
        // },
        filenames: filenames
    },
    resolve: {
        alias: alias
    },
    // entry: {
    //     vendor: ['immutable', 'lm-ui-react', './node_modules/antd/lib'],
    // },
    // externals: {
    //     echarts : {
    //         root: "echarts", // 指向全局变量
    //         entry: { // cdn地址
    //             path: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.0.2/echarts.js',
    //             type: 'js',
    //         },
    //         files: ['index.html', 'test.html'] // 适用于哪个文件
    //     },
    //     jquery: {
    //         root: "jQuery", // window.jQuery
    //         entry: { // cdn地址
    //             path: 'http://code.jquery.com/jquery-3.3.1.min.js',
    //             type: 'js',
    //         },
    //         files: ['index.html'] // 适用于哪个文件
    //     }
    // },
    // plugins: []
};