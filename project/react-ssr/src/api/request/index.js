/**
 * 由于
 * client的fetch可能会融合页面跳转、toast提示等浏览器端特有操作
 * server端端fetch可能会有根据response打日志，ctx redirect跳转等服务端特有操作
 *
 * 建议提取公共的fetch方法，在此基础之上再分别封装两端的request方法
 *
 * 以下为示例，具体可根据自己的业务需求调整
 * @type {{post, get}|*}
 * @private
 */
let _F = require('./client').default;

if (`${process.env.IS_SERVER}` === 'true') {
    // #if process.env.IS_SERVER === true
    // 在if endif 之间的代码不会被打包到client端
    _F = require('./server').default;
    // #endif
}

export default _F
