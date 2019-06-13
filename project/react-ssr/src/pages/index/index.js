// //import base&&tools
import 'scss_mixin/reset.scss' //reset 样式
import 'tools/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import {
    BrowserRouter as Router,
} from 'react-router-dom'
import Loadable from 'react-loadable'
import App from './containers/App'

// import containers
import reducers from "./reducers";
import storeMiddleWare from "./store/middleware";
import getStoreInitData from 'react-ssr-with-koa/getStoreInitData'
// import Login from 'passport-mobile-login'
//
// console.log(Login)

const supportsHistory = 'pushState' in window.history;

// getInitialStoreData from window
const storeInitData = getStoreInitData();


const store = createStore(reducers, {
    listData: storeInitData.listData || [],
    toastData: storeInitData.toastData || false
}, storeMiddleWare);


Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
        <Provider store={store}>
            <Router basename='/index' forceRefresh={!supportsHistory}>
                <App/>
            </Router>
        </Provider>,
        document.getElementById('root')
    );
});
