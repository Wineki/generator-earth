import React, { Component } from 'react'


import MainRouter from './MainRouter'
import MainApp from './MainApp'

import FooterBar from 'commons/FooterBar'
import Wrapper from 'react-ssr-with-koa/WrapperForContainer'

class App extends Component {

    // #if process.env.IS_SERVER === true
    static async getInitialProps(ctx) {


        return {
            AppWithServerData: '123'
        }
    }
    // #endif

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
                <p style={{color: 'blue', margin: '10px 0'}}>{JSON.stringify(initialData)}</p>
                <MainApp/>
                <FooterBar/>
                <MainRouter routeConfig={routeConfig}/>
            </div>


        )

    }

}

export default Wrapper({type: 'app'})(App);
