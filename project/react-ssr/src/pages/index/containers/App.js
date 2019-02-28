import React, { Component } from 'react'


import MainRouter from './MainRouter'
import MainApp from './MainApp'

import FooterBar from 'commons/FooterBar'
import Wrapper from 'react-ssr-with-koa/dist/WrapperForContainer'

class App extends Component {

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

const Comp = Wrapper({type: 'app'})(App);

Comp.getInitialProps = async (ctx) => {

    return {
        AppWithServerData: '123'
    }
}


export default Comp;
