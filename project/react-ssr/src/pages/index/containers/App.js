import React, { Component } from 'react'
import FooterBar from 'commons/FooterBar'

import MainRouer from './MainRouter'

import request from 'api/request'

class App extends Component {

    /**
     * 每一个page都有一个getInitialProps，用于获取初始数据或一些初始化操作
     * ctx即koa里的ctx
     *
     * @param ctx
     * @return {Promise<*>}
     */
    static async getInitialProps(ctx, reduxStore) {
        // const orderId = ctx.params.orderId;

        const ret = await request.post('http://localhost:8001/api/baseData', {})


        return {data: ret.data}
    }



    componentDidMount () {

        console.log('in this stage you can setState safe');

    }

    componentWillUnmount () {

        console.log('dont forget clear timer or remove listener');

    }

    //兄弟节点的传值问题
    //复杂情况下请使用redux
    //简单情况下 请使用Context，Context的使用请参考文档：(中文)https://cnodejs.org/topic/5a7aab01497a08f571384ec5， （英文）https://reactjs.org/docs/context.html
    render () {

        const {initialData} = this.props;

        return (



            <div>

                <FooterBar/>

                <MainRouer initialData={initialData}/>

            </div>

        )

    }

}

export default App;
