let files = ['index.html', 'page1.html', 'page2.html'];

module.exports = {
    'prop-types': {
        root: 'PropTypes',
        entry: {
            path: '//j1.58cdn.com.cn/jinrong/finsys-js/prop-types.min.js',
            type: 'js'
        },
        files: files
    },
    'react': {
        root: 'React',
        entry: {
            path: '//j1.58cdn.com.cn/jinrong/finsys-js/react.production.min.js',
            type: 'js'
        },
        files: files
    },
    'react-dom': {
        root: 'ReactDOM',
        entry: {
            path: '//j1.58cdn.com.cn/jinrong/finsys-js/react-dom.production.min.js',
            type: 'js'
        },
        files: files
    },
    'redux': {
        root: 'Redux',
        entry: {
            path: '//j1.58cdn.com.cn/jinrong/finsys-js/redux.min.js',
            type: 'js'
        },
        files: files
    },
    'react-redux': {
        root: 'ReactRedux',
        entry: {
            path: '//j1.58cdn.com.cn/jinrong/finsys-js/react-redux.min.js',
            type: 'js'
        },
        files: files
    },
    'redux-thunk': {
        root: 'ReduxThunk',
        entry: {
            path: '//j1.58cdn.com.cn/jinrong/finsys-js/redux-thunk.min.js',
            type: 'js'
        },
        files: files
    },
    'react-router-dom': {
        root: 'ReactRouterDOM',
        entry: {
            path: '//j1.58cdn.com.cn/jinrong/finsys-js/react-router-dom.min.js',
            type: 'js'
        },
        files: files
    },
    'lodash': {
        root: '_',
        entry: {
            path: '//j1.58cdn.com.cn/jinrong/finsys-js/lodash.min.js',
            type: 'js'
        },
        files: files
    },
    'moment': {
        root: 'moment',
        entry: {
            path: '//j1.58cdn.com.cn/jinrong/finsys-js/moment-with-zh-cn.js',
            type: 'js'
        },
        files: files
    },
    'antd': {
        root: 'antd',
        entry: [
            {
                path: '//j1.58cdn.com.cn/jinrong/finsys-js/antd.min.js',
                type: 'js'
            },
            {
                path: '//j1.58cdn.com.cn/jinrong/finsys-js/antd.min.css',
                type: 'css'
            }
        ],
        files: files
    }
}