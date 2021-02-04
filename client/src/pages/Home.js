import React, { Component } from 'react';

class Home extends Component {
    state = {}

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    componentDidMount() {}

    handleInputChange = event => { //this is boilerplate stuff and can be reused 
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <>
                <h1>Home Page</h1>
            </>
        )
    }
}

export default Home;
