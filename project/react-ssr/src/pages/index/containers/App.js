import React, { Component } from 'react'


import MainRouter from './MainRouter'
import MainApp from './MainApp'

import FooterBar from 'commons/FooterBar'
import Wrapper from 'react-ssr-with-koa/dist/WrapperForContainer'

class App extends Component {

    static async getInitialProps(ctx) {
        return {
            AppWithServerData: '123'
        }
    }

    componentDidMount () {

        console.log('in this stage you can setState safe');

    }

    componentWillUnmount () {

        console.log('dont forget clear timer or remove listener');

    }


    render () {


        const {routeConfig, initialData} = this.props;

        return (

            <div>
                {JSON.stringify(initialData)}
                <MainApp/>
                <FooterBar/>
                <MainRouter routeConfig={routeConfig}/>
            </div>


        )

    }

}

export default Wrapper({type: 'app'})(App);
