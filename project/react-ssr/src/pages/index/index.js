// //import base&&tools
import 'scss_mixin/reset.scss' //reset 样式
import 'tools/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import store from './store/index'
import {Provider} from 'react-redux'
import {
    BrowserRouter as Router,
} from 'react-router-dom'
import Loadable from 'react-loadable'

// import containers
import App from './containers/App'
import routeConfig from './routeConfig';
// import Login from 'passport-mobile-login'
//
// console.log(Login)

const supportsHistory = 'pushState' in window.history;


Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
        <Provider store={store}>
            <Router basename='/index' forceRefresh={!supportsHistory}>
                <App routeConfig={routeConfig}/>
            </Router>
        </Provider>,
        document.getElementById('root')
    );
});
