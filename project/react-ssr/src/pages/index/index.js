//import base&&tool
import 'scss_mixin/reset.scss' //reset 样式
import 'tools/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import {
    BrowserRouter as Router,
} from 'react-router-dom'

// react-loadable 异步加载路由页面
import Loadable from 'react-loadable'


// import containers
import App from './containers/App'


const supportsHistory = 'pushState' in window.history;
const initialData = window.__PRELOADED_STATE__ ? window.__PRELOADED_STATE__.pageProps : {};

delete window.__PRELOADED_STATE__;

Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
        <Router basename='/index' forceRefresh={!supportsHistory}>
            <App initialData={initialData}/>
        </Router>,
        document.getElementById('root')
    );
});
