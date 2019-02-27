import React from 'react'

// Wrapper({name: 'my'})(App)

const Wrapper = (option) => {

    const routeName = option.name;

    return (Comp) => {

        return class extends React.Component {

            constructor(props) {
                super(props);

                // todo: 这段逻辑抽离成高阶组件
                this.isClient = !!window.__PRELOADED_STATE__;

                // 这里只对window.__PRELOADED_STATE__.routeProps做处理
                // pageProps由于是顶级组件，可以放一些全部不变的数据
                this.state  = {
                    initialData: this.isClient && window.__PRELOADED_STATE__.routeProps[routeName] ?
                        window.__PRELOADED_STATE__.routeProps[routeName] :
                        this.props.initialData
                }
            }

            componentDidMount() {
                if (this.state.initialData) {
                    delete window.__PRELOADED_STATE__.routeProps[routeName]
                }
            }

            render() {

                const {initialData} = this.state;

                return (
                    <Comp {...this.props} initialData={initialData}/>
                )
            }

        }
    }
};

export default Wrapper
