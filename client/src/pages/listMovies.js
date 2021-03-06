import React, { Component } from 'react';
import MovieModal from '../components/MovieModal.js';
import GlobalNav from '../components/GlobalNav.js';
import { listMoviesAPI, getMovieDetailsAPI } from '../util/API.js';
import { Table, Button } from 'reactstrap';

class listMovies extends Component {
    state = {
        movies: null, movieList: [], movieDetails: null, showModalComponent: false
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
                this.setState({
                    movies: res.data,
                    movieList: Object.keys(res.data)
                });

                // this.setState({
                //     movieList: Object.keys(res.data)
                // });
            })
            .catch(err => console.log(`error with retrieving movies: ${err}`));
    };

    handleShowComponentAndMovieInfo = (movieName) => {
        getMovieDetailsAPI(movieName)
            .then(res => {
                this.setState({
                    movieDetails: res.data,
                    showModalComponent: true
                });
            })
            .catch(err => console.log(`error with getting movie detail: ${err}`))
    }

    handleClearModalInfo = () => {
        this.setState({
            showModalComponent: false,
            movieDetails: null
        });
    }

    render() {
        return (
            <>
                <div><GlobalNav /></div>
                <div>
                    <Table hover bordered dark className="text-center">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>First Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.movieList.map(name => {
                                return <tr key={this.state.movieList.indexOf(name) + 1} data-name={name}>
                                    <th scope="row">{this.state.movieList.indexOf(name) + 1}</th>
                                    <td data-name={name} onClick={() => this.handleShowComponentAndMovieInfo(name)}><Button color="secondary" className="bg-dark movies-shows-list">{name}</Button></td>
                                    <td>{this.state.movies[name]}</td>
                                </tr>
                            })}
                            {/* {this.state.showModalComponent ? <ReactModal ariaHideApp={false} isOpen={this.state.showModalComponent} onAfterClose={this.handleClearModalInfo} >
                            <p>{JSON.stringify(this.state.movieDetails)}</p>
                            <div className='text-center'>
                                <Button onClick={this.handleClearModalInfo} color='danger'> CLOSE </Button>
                            </div>
                        </ReactModal> : null} */}
                            {this.state.showModalComponent ? <MovieModal movieObj={this.state.movies} selectedMovie={this.state.movieDetails} open={this.state.showModalComponent} close={() => this.handleClearModalInfo()} /> : null}
                            <tr>
                                <th scope="row">Total:</th>
                                <td><b>{this.state.movieList.length}</b></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }
}

export default listMovies;
