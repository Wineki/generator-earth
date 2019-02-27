import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    Route,
    Switch,
} from 'react-router-dom'


import { fetchListData } from '../../actions/list'

import List from './list'
import request from 'api/request'

class Site extends Component {

    static async getInitialProps(ctx) {

        // 由于项目中用了redux-thunk，不是promise形式，无法在fetch后拿到数据
        // 这里直接请求，然后放到store里
        const data = await Promise.all(
            [
            request.post('/api/test/listDate', {
                id: 1,
                age: 20
            })
            ]
        );


        ctx.reduxStore.dispatch({
            type: 'FETACH_LIST_DATA',
            data: data[0]
        });
    }


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
