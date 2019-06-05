import React, { Component } from 'react'
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import reducers from './reducers/index'
import storeMiddleWare from './store/middleware'
import { StaticRouter } from 'react-router-dom'


import App from './containers/App'
import routeConfig from './containers/routeConfig';
import request from './../../api/request'


// only for ssr
class AppSSR extends Component {

    /**
     * getInitialStore。如果用到redux，像client一样，需要手动初始化server的store，并挂载到ctx上
     * ctx即koa里的ctx
     *
     * @param ctx
     */
    static async getInitialStore(ctx) {

        // 可以向store中注入初始数据
        // ctx.reduxStore = createStore(reducers,  {
        //     listData: [{
        //         "title": "新闻一",
        //         "id": 4
        //     }, {
        //         "title": "新闻一",
        //         "id": 1
        //     }
        //     ]
        // },storeMiddleWare);

        // 向server端的fetch注入ctx
        request.injectCtx(ctx);

        // 将store注入到ctx.reduxStore上
        ctx.reduxStore = createStore(reducers, storeMiddleWare);

    }


    // 如果需要在路由组件中获取数据，需要传递routeConfig
    static routeConfig = routeConfig;
    // 如果App的初始数据是通过getInitialProps获取的，则需要传递App
    static App = App;



    render () {


        const {
            basename,
            location,
            context
        } = this.props;

        const { store } = this.props;

        return (

            <Provider store={store}>
                <StaticRouter
                    basename={basename}
                    location={location}
                    context={context}
                >
                    <App routeConfig = {routeConfig}/>
                </StaticRouter>
            </Provider>


        )

    }

}


export default AppSSR
