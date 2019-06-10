import * as React from 'react'
import {
    Route,
    Switch
} from 'react-router-dom'

import * as Loading from 'lm-loading'

import request from 'api/request'


// bundleLoader
import * as BundleLoader from 'lm-bundle-loader'


import List from './list'
const Detail = () => import('./detail' /* webpackChunkName:"site_detail" */);

interface IState {
    listData: object[],
    loadingShow: boolean
}
interface IProps {
    match: object
}

class Site extends React.Component<IProps, IState> {

    constructor (props: IProps) {
        super(props);
        this.loadingChangeHandle = this.loadingChangeHandle.bind(this);
    }

    state: IState = {
        listData: [],
        loadingShow: false
    }

    _isMounted: boolean = false;

    componentDidMount () {

        this._isMounted = true;

        const { listData } = this.state;

        if (listData.length > 0) return;

        this.fetchListData();

    }

    componentWillUnmount () {

        this._isMounted = false;

        console.log('dont forget clear timer or remove listener');

    }

    loadingChangeHandle (showState: boolean) {

        this.setState({
            loadingShow: showState
        });

    }

    fetchListData () {

        this.loadingChangeHandle(true);

        request.post('/test/aaa', {})
            .then((data: []) => {

                this.loadingChangeHandle(false);

                this._isMounted && this.setState({ listData: data })

            })

    }


    render () {

        const { match } = this.props;
        const { listData, loadingShow } = this.state;

        return (
            <div>
                <Switch>
                    <Route exact path={`${match.path}`} render={routeProps => {
                        return <List listData={listData} />
                    }}/>
                    <Route
                        path={`${match.path}/:id`}
                        render={
                            (props) => BundleLoader(Detail, props)
                        }
                    />
                </Switch>
                <Loading isShow={loadingShow} />
            </div>

        )

    }

}

export default Site
