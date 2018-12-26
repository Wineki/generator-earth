import React from 'react'
// bundleLoader
import Loadable from 'react-loadable'

import Home from "./Home";
import Site from './Site'

import {
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom'

// scrollToTop
import ScrollToTop from 'commons/ScrollToTop'


// 异步加载文件 参考文档 https://webpack.js.org/guides/code-splitting/#dynamic-imports
// import()内的路径建议写成带有page的路径，eg:"./My"写成"../../index/containers/My"
// 参数中的注释部分不建议删除，原因请看上述文档
const My = Loadable({
    loader: () => import( '../../index/containers/My' /* webpackChunkName:"My" */ ),
    loading() {
        return 'loading....'
    }
});


class MainRouter extends React.Component {
    render() {

        return (
            <ScrollToTop>
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/site' component={Site}/>
                    <Route path='/my'
                           component={My}
                    />

                    <Redirect to='/home'/>
                </Switch>
            </ScrollToTop>
        )
    }
}

export default withRouter(MainRouter)
