import React, { Component } from 'react'
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import reducers from './reducers/index'
import storeMiddleWare from './store/middleware'
import { StaticRouter } from 'react-router-dom'


import App from './containers/App'
import routeConfig from './routeConfig';


// only for ssr
class AppSSR extends Component {

    /**
     * 每一个page都有一个getInitialProps，用于获取初始数据或一些初始化操作
     * ctx即koa里的ctx
     *
     * @param ctx
     * @return {Promise<*>}
     */
    static async getInitialStore(ctx) {

        ctx.reduxStore = createStore(reducers, storeMiddleWare);
        // fetch or something
        // return出的数据可以在render中的this.props中拿到

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
