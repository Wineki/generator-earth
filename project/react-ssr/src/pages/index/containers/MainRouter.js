import React from 'react'

import {
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom'

// scrollToTop
import ScrollToTop from 'commons/ScrollToTop'



class MainRouter extends React.Component {
    render() {

        const {routeConfig} = this.props;

        return (
            <ScrollToTop>
                <Switch>
                    {
                        routeConfig.map((route, i) => {
                            if (route.routes) {
                                return (
                                    <Route path={route.path}
                                           render={(routeProps) => {
                                               return (
                                                   <route.component
                                                       {...routeProps}
                                                       routeConfig={route.routes}
                                                       key={i}
                                                   />
                                               )
                                           }}
                                           key={i}
                                    />
                                )
                            }
                            return (
                                <Route path={route.path}
                                       component={route.component}
                                       key={i}
                                />
                            )
                        })
                    }

                    <Redirect to='/home'/>
                </Switch>
            </ScrollToTop>
        )
    }
}

export default withRouter(MainRouter)
