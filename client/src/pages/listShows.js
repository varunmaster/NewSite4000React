import React, { Component } from 'react';
import ShowModal from '../components/ShowModal.js';
import { listShowsAPI, getShowDetailsAPI } from '../util/API.js';
import { Table } from 'reactstrap';

class listMovies extends Component {
    state = {
        shows: null, showsList: [], showDetails: {}, showModalComponent: false
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
                // console.log(res.data);
                this.setState({
                    shows: res.data,
                    showsList: Object.keys(res.data)
                });

                // this.setState({
                //     showsList: Object.keys(res.data)
                // });
            })
            .catch(err => console.log(`error with retrieving shows: ${err}`));
    };

    handleShowComponentAndMovieInfo = (showName) => {
        getShowDetailsAPI(showName)
            .then(res => {
                this.setState({
                    showDetails: res.data,
                    showModalComponent: true
                });
            })
            .catch(err => console.log(`error with getting show detail: ${err}`))
    }

    handleClearModalInfo = () => {
        this.setState({
            showModalComponent: false,
            showDetails: null
        });
    }

    render() {
        return (
            <>
                <Table hover bordered dark className="text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>First Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.showsList.map(name => {
                            return <tr key={this.state.showsList.indexOf(name) + 1} data-name={name}>
                                <th scope="row">{this.state.showsList.indexOf(name) + 1}</th>
                                <td data-name={name} onClick={() => this.handleShowComponentAndMovieInfo(name)}>{name}</td>
                                <td>{this.state.shows[name]}</td>
                            </tr>
                        })}
                        {this.state.showModalComponent ? <ShowModal showObj={this.state.shows} selectedShow={this.state.showDetails} open={this.state.showModalComponent} close={() => this.handleClearModalInfo()} /> : null}
                        <tr>
                            <th scope="row">Total:</th>
                            <td><b>{this.state.showsList.length}</b></td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    }
}

export default listMovies;
