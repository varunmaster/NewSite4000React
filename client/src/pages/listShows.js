import React, { Component } from 'react';
//import MovieModal from '../components/MovieModal.js';
import { listShowsAPI } from '../util/API.js';
import { Table } from 'reactstrap';

class listMovies extends Component {
    state = {
        movies: null, movieList: []
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    componentDidMount() {
        this.handleGetAllShows();
    }

    handleGetAllShows = () => {
        listShowsAPI()
            .then(res => {
                console.log(res.data);
                // this.setState({
                //     movies: res.data
                // });

                // this.setState({
                //     movieList: Object.keys(res.data)
                // });
            })
            .catch(err => console.log(`error with retrieving movies: ${err}`));
    };

    // handleShowComponentAndMovieInfo = (movieName) => {
    //     getMovieDetailsAPI(movieName)
    //         .then(res => {
    //             this.setState({
    //                 movieDetails: res.data,
    //                 showModalComponent: true
    //             });
    //         })
    //         .catch(err => console.log(`error with getting movie detail: ${err}`))
    // }

    // handleClearModalInfo = () => {
    //     this.setState({
    //         showModalComponent: false,
    //         movieDetails: null
    //     });
    // }

    render() {
        return (
            <>
            <p>hi</p>
            </>
        )
    }
}

export default listMovies;
