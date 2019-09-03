import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';

import Loading from 'lm-loading';

import request from 'api/request';


// bundleLoader
import BundleLoader from 'lm-bundle-loader';

import List from './list';
import { ISite, State, initialState} from './interface';

const Detail = () => import('./detail' /* webpackChunkName:"site_detail" */);

class Site extends React.Component<ISite, State> {

    constructor (props: ISite) {
        super(props);
        this.loadingChangeHandle = this.loadingChangeHandle.bind(this);
    }

    readonly state: State = initialState

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
                    <Route exact path={`${match.path}`} render={(routeProps: ISite) => {
                        return <List listData={listData} />
                    }}/>
                    <Route
                        path={`${match.path}/:id`}
                        render={
                            (props: ISite) => BundleLoader(Detail, props)
                        }
                    />
                </Switch>
                <Loading isShow={loadingShow} />
            </div>

        )

    }

}

export default Site
