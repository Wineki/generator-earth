import React from 'react'

import './app.scss'

const list = ['click 1', 'click 2', 'click 3', 'click 4'];

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            selected: 0
        }
    }

    handleClick(key) {
        this.setState({
            selected: key
        })
    }

    render() {

        const { selected } = this.state;

        return <div style={{color: 'red'}}>
            <ul>
                {
                    list.map((item, key) => {
                        return (
                            <li onClick={() => this.handleClick(key)}
                                style={{background: selected === key ? 'red' : '#fff'}}
                                key={key}
                            >
                                click {key}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    }
}

export default App
