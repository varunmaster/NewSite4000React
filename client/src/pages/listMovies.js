import React, { Component } from 'react';
//import MovieTable from '../components/MovieTable.js';
import { listMoviesAPI } from '../util/API.js';
import { Table } from 'reactstrap';

class listMovies extends Component {
    state = {
        movies: null,
        movieList: []
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
                    movies: res.data
                });

                this.setState({
                    movieList: Object.keys(res.data)
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
                {/* <p>hello test</p> */}
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
                            return <tr key={this.state.movieList.indexOf(name) + 1}>
                                <th scope="row">{this.state.movieList.indexOf(name) + 1}</th>
                                <td>{name}</td>
                                <td>{this.state.movies[name]}</td>
                            </tr>
                        })}
                        <tr>
                            <th scope="row">Total:</th>
                            <td><b>{this.state.movieList.length}</b></td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    }
}

export default listMovies;
