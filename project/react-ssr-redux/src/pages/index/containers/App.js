import React, { Component } from 'react'


import MainRouter from './MainRouter'
import MainApp from './MainApp'

class App extends Component {

    /**
     * 每一个page都有一个getInitialProps，用于获取初始数据或一些初始化操作
     * ctx即koa里的ctx
     *
     * @param ctx
     * @return {Promise<*>}
     */
    static async getInitialProps(ctx, reduxStore) {
        // fetch or something
        // return出的数据可以在render中的this.props中拿到
        // return {
        //     a: 123
        // }
    }


    componentDidMount () {

        console.log('in this stage you can setState safe');

    }

    componentWillUnmount () {

        console.log('dont forget clear timer or remove listener');

    }


    render () {

        // console.log(this.props.initialData)

        return (

            <div>
                <MainApp/>
                <MainRouter/>
            </div>


        )

    }

}


export default App;
