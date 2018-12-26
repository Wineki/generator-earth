const start = require('earth-scripts/server/app');
const logger = require('earth-scripts/server/lib/logger');
const env = require('./config/server');
const http = require('http');


const Router = require('koa-router');
const html = require('earth-scripts/server/html');

const PAGE = 'index';

const router = new Router();

const App = require('./src/pages/index/containers/App');

// 如果需要添加逻辑，可以自定义入口文件
// earth-scripts ssr-start --entry=server.js

start().then((app) => {


    // 针对每条请求打log
    app.performance();

    // 代理功能，如果不用，可以删掉
    app.proxyApi({
        prefix: 'api', // 前端与node约定的前缀 /api/user/info代理后的地址是/user/info
        apiProxyBefore: async (ctx) => {
            // 可以修改target,headers,selfHandleResponse
            ctx._app_proxyOption = {
                selfHandleResponse: true
            }
        },
        apiProxyReceived: async (req, res) => {
            /**
             * 如果需要简单修改代理后的响应结果，可以实现_app_proxy方法
             * 不适用请求合并之类的大改动
             * @param data 响应object
             * @param send 回调send发送
             * @return {Promise<void>}
             * @private
             */
            res._app_proxy = async (data, send) => {
                // data = formatData(data);
                send(data)
            }
        }
    });

    // 必有
    // ssr功能，defaultSSR false时，需要自己写router，并引入ssr相关方法，示例如下
    app.init({
        defaultSSR: true   // 使用默认的ssr
    });

    // page
    // router.get("/index*", async (ctx, next) => {
    //
    //     const htmlObj = new html(ctx, PAGE)
    //         .init({app: App, ssr: true});
    //
    //     await htmlObj.render().catch((e) => {
    //             logger.error(e);
    //         }
    //     );
    // });

    app.use(router.routes());


    const port = env.port;
    const appCallback = app.callback();
    const server = http.createServer(appCallback);

    server
        .listen(port)
        .on('clientError', (err, socket) => {
            // handleErr(err, 'caught_by_koa_on_client_error');
            socket.end('HTTP/1.1 400 Bad Request Request invalid\r\n\r\n');
        });


    console.log(`custom Server client running on: http://localhost: ${port}`);
});
