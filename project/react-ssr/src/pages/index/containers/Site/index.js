import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    Route,
    Switch,
} from 'react-router-dom'


import { fetchListData } from '../../actions/list'

import List from './list'

class Site extends Component {

    // #if process.env.IS_SERVER === true
    static async getInitialProps(ctx) {

        await ctx.reduxStore.dispatch(fetchListData());

    }
    // #endif


    constructor (props) {

        super(props);
        this.state = {

            listData: []

        };

    }

    componentDidMount () {

        const { listData } = this.props;

        if (listData.length > 0) return;

        this.props.fetchListData();

    }



    render () {

        const { match } = this.props;
        const { listData } = this.props;

        // return cloneChildren
        return (
            <Switch>
                {
                    this.props.routeConfig.map((route, i) => {
                        if (route.path === '/site') {
                            return (
                                <Route
                                    path={route.path}
                                    exact={route.exact}
                                    render={routeProps => <List listData={listData} {...routeProps}/>}
                                    key={i}
                                />
                            )
                        }

                        return (
                            <Route
                                path={route.path}
                                exact={route.exact}
                                component={route.component}
                                key={i}
                            />
                        )
                    })
                }

            </Switch>
        )

    }

}

const mapStateToProps = (state) => {

    return {
        listData: state.listData
    }

};

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        fetchListData: (...args) => dispatch(fetchListData(...args)),
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Site)
