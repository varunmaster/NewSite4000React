import React, { Component } from 'react';
import { MovieTable } from '../components/MovieTable.js';
import { listMoviesAPI } from '../util/API.js';
import { ListGroup, ListGroupItem } from 'reactstrap';


class listMovies extends Component {
    state = {
        movies: []
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    componentDidMount() {
        this.handleGetAllMovies();
    }

    handleGetAllMovies = () => {
        listMoviesAPI()
            .then(res => {
                //console.log(res.data);
                return this.setState({
                    movies: res.data
                });
            })
            .catch(err => console.log(`error with retrieving movies: ${err}`));
    };

    handleInputChange = event => { //this is boilerplate stuff and can be reused 
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <>
                {/* <MovieModal ></MovieModal> */}
                {console.log(this.state.movies)}
                {/* <p>hello test</p> */}
                {/* <MovieTable movieObj={this.state.movies}></MovieTable> */}
            </>
        )
    }
}

export default listMovies;
