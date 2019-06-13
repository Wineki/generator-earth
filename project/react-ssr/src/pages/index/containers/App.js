import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import ScrollToTop from 'commons/ScrollToTop'

import {
    Switch,
} from 'react-router-dom'
import routeConfig from './routeConfig'


class App extends Component {


    componentDidMount () {

        console.log('in this stage you can setState safe');

    }

    componentWillUnmount () {

        console.log('dont forget clear timer or remove listener');

    }


    render () {


        return (

            <Switch>
                <ScrollToTop>
                    {renderRoutes(routeConfig)}
                </ScrollToTop>
            </Switch>


        )

    }

}

export default App;
