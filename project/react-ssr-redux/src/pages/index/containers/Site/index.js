import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from 'lm-loading'

import {
    Route,
    Switch,
} from 'react-router-dom'

// bundleLoader
import Loadable from 'react-loadable'

import { fetchListData } from '../../actions/list'

import List from './list'
const Detail  = Loadable({
    loader: () => import('../../../index/containers/Site/detail' /* webpackChunkName:"site_detail" */),
    loading() {
        return <Loading isShow={true}/>
    }
});


class Site extends Component {


    constructor (props) {

        super(props);
        this.state = {

            listData: []

        };

    }

    componentDidMount () {

        const { listData } = this.state;

        if (listData.length > 0) return;

        this.props.fetchListData();

    }



    render () {

        const { match } = this.props;
        const { listData } = this.state;

        // return cloneChildren
        return (
            <Switch>
                <Route
                    exact
                    path={`${match.path}`}
                    render={routeProps => <List listData={listData} {...routeProps}/>}
                />
                <Route
                    path={`${match.path}/:id`}
                    component={Detail}
                />
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
