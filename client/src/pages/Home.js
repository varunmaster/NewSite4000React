import React, { Component } from 'react';
import { Card, Button, CardDeck, CardBody } from 'reactstrap';
import movies from '../assets/movies.jpg';
import shows from '../assets/shows.webp';

class Home extends Component {
    state = {}

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    componentDidMount() { }

    handleInputChange = event => { //this is boilerplate stuff and can be reused 
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <>
                <div className="bg-dark text-center">
                    <h1>Home Page</h1>
                </div>
                <div className="bg-dark text-center">
                    <CardDeck className="bg-dark">
                        <Card className="bg-dark text-center">
                            <center><img width="350px" src={movies} alt="movies" /></center>
                            <CardBody>
                                <Button className="btn btn-lg btn-info" href="/listMovies">Show me the damn movies!</Button>
                            </CardBody>
                        </Card>
                        <Card className="bg-dark text-center">
                            <center><img width="300px" src={shows} alt="movies" /></center>
                            <CardBody>
                                <Button className="btn btn-lg btn-info" href="/listShows">Show me the damn shows!</Button>
                            </CardBody>
                        </Card>
                    </CardDeck>
                </div>
            </>
        )
    }
}

export default Home;
