const start = require('earth-scripts/server/app');
const logger = require('earth-scripts/server/lib/logger');
const env = require('./config/server');
const http = require('http');


const Router = require('koa-router');
const html = require('earth-scripts/server/html');
const { createStore } = require('redux');

const PAGE = 'index';

const router = new Router();

const App = require('./src/pages/index/containers/App');
const reducers = require('./src/pages/index/reducers/index').default ;



start().then((app) => {


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
        // selfHandleResponse: true 情况下，会拿到代理后的内容
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
                data.unshift({title: "server title", id: 1123})
                send(data)
            }
        }
    });

    app.init({
        defaultSSR: false
    });

    // page
    router.get("/index*", async (ctx, next) => {

        const htmlObj = new html(ctx, PAGE)
            .init({app: App, ssr: true})
            .injectStore(createStore(reducers, {}));

        await htmlObj.render().catch((e) => {
                logger.error(e);
            }
        );
    });

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
