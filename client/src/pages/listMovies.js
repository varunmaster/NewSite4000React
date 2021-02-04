import React, { Component } from 'react';
import { MovieModal } from '../components/MovieModal.js';
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
                console.log(`data returned after api call to backend: \n${res.data}`);
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
                {console.log("We reached the front end")}
                {console.log(this.state.movies)}
                {/* <MovieModal ></MovieModal> */}
                <p>hello test</p>
            </>
        )
    }
}

export default listMovies;
