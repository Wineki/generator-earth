// //import base&&tools
import React from 'react';
import 'scss_mixin/reset.scss' //reset 样式
import 'tools/polyfill'
import ReactDOM from 'react-dom'

import App from './containers/App'


// import containers

// import Login from 'passport-mobile-login'
//
// console.log(Login)

ReactDOM.hydrate(
    <App/>,
    document.getElementById('root')
);
