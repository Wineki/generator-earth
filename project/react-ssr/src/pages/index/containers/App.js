import React, { Component } from 'react'


import MainRouter from './MainRouter'
import MainApp from './MainApp'

import FooterBar from 'commons/FooterBar'

class App extends Component {


    componentDidMount () {

        console.log('in this stage you can setState safe');

    }

    componentWillUnmount () {

        console.log('dont forget clear timer or remove listener');

    }


    render () {


        const {routeConfig} = this.props;

        return (

            <div>
                {JSON.stringify(this.props.initialData)}
                <MainApp/>
                <FooterBar/>
                <MainRouter routeConfig={routeConfig}/>
            </div>


        )

    }

}


export default App;
