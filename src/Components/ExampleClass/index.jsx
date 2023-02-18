import React, { Component } from 'react';

export default class ExampleClass extends Component {
    name = 'ExampleClass';
    constructor() {
        super();
        this.state = {
            count: 0 
        }
    }
    componentDidMount() {
        console.log('mount nè');
    }
    componentWillUnmount() {
        console.log('unmount nè');
    }
    // componentDidUpdate() {
    //     console.log(this.state);
    // }
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState);
        return false;
    }
    render() {
        return (
            <div>{this.state.count}{this.name}
            <button onClick={() => {
                this.setState({
                    count: this.state.count + 1
                })
            }}>Click</button>
            </div>
        )
    }
}