import React from 'react'
import './index.scss'
import Wrapper from 'react-ssr-with-koa/dist/WrapperForContainer'

class My extends React.Component {

    static async getInitialProps() {
        // todo: server在这里请求数据
        return 'my data from server'
    }


    constructor(props) {
        super(props);

        this.state  = {
            initData: this.props.initialData
        }

    }

    componentDidMount() {
        if (!this.props.initialData) {
            // TODO: fetch, 这里用setTimeout模拟
            setTimeout(() => {
                this.setState({
                    initData: 'data from didmount'
                })
            }, 2000)
        }
    }

    render() {

        const { initData } = this.state;

        return (
            <div className='page-my'>
                {`hello world im async chunk js`}
                <p>{initData}</p>
            </div>
        )
    }
}


export default Wrapper({name: 'My', type: 'route'})(My)
