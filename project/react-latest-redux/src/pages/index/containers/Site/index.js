import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    Route,
    Switch,
} from 'react-router-dom'

// bundleLoader
import BundleLoader from 'commons/BundleLoader'
// propsRoute
import PropsRoute from "commons/PropsRoute";

import { fetchListData } from '../../actions/list'

import List from './list'
const Detail = () => import('./detail' /* webpackChunkName:"site_detail" */);


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
                <PropsRoute
                    exact
                    path={`${match.path}`}
                    component={ List }

                    listData={ listData }

                />
                <Route
                    path={`${match.path}/:id`}
                    render={
                        (props) => BundleLoader(Detail, props)
                    }
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
