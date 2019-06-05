import React, { Component } from 'react'

import App from './containers/App'


// only for ssr
class AppSSR extends Component {


    // 如果App的初始数据是通过getInitialProps获取的，则需要传递App
    static App = App;



    render () {


        return (
            <App/>
        )

    }

}


export default AppSSR
