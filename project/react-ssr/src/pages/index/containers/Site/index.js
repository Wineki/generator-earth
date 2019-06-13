import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'


import { fetchListData } from '../../actions/list'


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

        const { route } = this.props;
        const { listData } = this.props;

        return renderRoutes(route.routes, {
            listData
        })


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
