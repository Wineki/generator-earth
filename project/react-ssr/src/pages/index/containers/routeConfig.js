
import Home from "./Home";
import Site from './Site'
import Loadable from "react-loadable";
import Loading from "lm-loading";
import React from "react";
import List from './Site/list'
const My = Loadable({
    loader: () => import( '../../index/containers/My/index.js' /* webpackChunkName:"My" */ ),
    loading() {
        return 'loading....'
    }
});
const Detail  = Loadable({
    loader: () => import('../../index/containers/Site/detail' /* webpackChunkName:"site_detail" */),
    loading() {
        return <Loading isShow={true}/>
    }
});


export default [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/site',
        component: Site,
        routes: [{
            path: '/site',
            component: List,
            exact: true
        },{
            path: '/site/:id',
            component: Detail,
        }]
    },
    {
        path: '/my',
        component: My
    }
]
