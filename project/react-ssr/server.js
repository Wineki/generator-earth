const http = require('http');
const config = require('./config/server');

const {start, logger, Html, proxyToServer} = require('react-ssr-with-koa');

const Koa = require('koa');
const app = new Koa();


const Router = require('koa-router');
const router = new Router();

process.on('uncaughtException', (err) => {
    logger.error('uncaughtException' + err.stack);
    throw err
});

process.on('unhandledRejection', (err) => {
    logger.error('unhandledRejection' + err.stack);
});

// 使用默认logger
logger.init();

start(app, {
    useDefaultProxy: true, // 使用react-ssr-with-koa里的proxy
    useDefaultSSR: false  // 使用默认的ssr
})
    .then(() => {
        app.proxy = true;

        // catch error
        app.use(async (ctx, next) => {
            try {
                await next()
            } catch (e) {
                logger.error(e.stack);
                ctx.body = 'server error';
            }
        });


        // api
        // 直接转发
        router.get('/api/simpleResponse', async (ctx, next) => {
            const prefix = 'api';
            const proxyPath = ctx.request.url.replace(new RegExp(`^/${prefix}/`), '/');

            const proxyOption = {
                target: `${config.proxyPath}/${proxyPath}`,
            };

            await proxyToServer(ctx, proxyOption)
                .catch((e) => {

                });
        });

        // page
        router.get("/index*", async (ctx, next) => {

            const PAGE = 'index';

            const htmlObj = new Html(ctx, PAGE)
                .init({
                    ssr: true,
                })
            // 如果不在这里传入initialData
            // 可在组件static getInitialProps()方法里直接return数据
            // 每种数据的获取方式只能选择其中一种方式，不能混用
            // 使用redux情况下，需要在indexSSR组件中获取数据，见示例
            // .injectInitialData({
            //     pageProps: {},    // 根组件(App)下的数据
            //     routeProps: {     // 路由组件下的数据
            //         My: {
            //             serverData: 'my inject data'
            //         }
            //     }
            // })

            await htmlObj.render().catch((e) => {
                    logger.error(e);
                }
            );
        });

        router.get("/account*", async (ctx, next) => {

            const PAGE = 'account';

            const htmlObj = new Html(ctx, PAGE)
                .init({
                    ssr: true,
                })
            // 如果不在这里传入initialData
            // 可在组件里直接return数据
            // .injectInitialData({
            //     pageProps: {},
            //     routeProps: {
            //         My: {
            //             serverData: 'my inject data'
            //         }
            //     }
            // })

            await htmlObj.render().catch((e) => {
                    logger.error(e);
                }
            );
        });

        app.use(router.routes());

        const port = config.port;
        const appCallback = app.callback();
        const server = http.createServer(appCallback);

        server
            .listen(port)
            .on('clientError', (err, socket) => {
                // handleErr(err, 'caught_by_koa_on_client_error');
                socket.end('HTTP/1.1 400 Bad Request Request invalid\r\n\r\n');
            });


        console.log(`custom Server client running on: http://localhost: ${port}`);
    })

