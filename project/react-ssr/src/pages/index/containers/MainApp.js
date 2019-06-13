import React, { Component } from 'react'
import { connect } from 'react-redux'
import Wrapper from 'react-ssr-with-koa/WrapperForContainer'
import Loading from 'lm-loading'
import FooterBar from '../../../components_common/FooterBar'
import { renderRoutes } from 'react-router-config'

class App extends Component {

    // #if process.env.IS_SERVER === true
    static async getInitialProps(ctx) {


        return {
            AppWithServerData: '123'
        }
    }
    // #endif


    componentDidMount () {

        console.log('in this stage you can setState safe');

    }

    componentWillUnmount () {

        console.log('dont forget clear timer or remove listener');

    }


    render () {

        const {initialData, route} = this.props;

        return (

            <div>
                <p style={{color: 'blue', margin: '10px 0'}}>{JSON.stringify(initialData)}</p>
                <FooterBar/>
                <Loading isShow={ this.props.showState }/>

                {renderRoutes(route.routes)}

            </div>


        )

    }

}


const mapStateToProps = (state) => {

    return {

        showState: state.toastData.showState

    }

};

export default Wrapper({name: 'index_MainApp'})(connect(mapStateToProps)(App));
