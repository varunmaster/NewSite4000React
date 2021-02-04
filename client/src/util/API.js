import axios from 'axios';

export const listMoviesAPI = () => {
    console.log(`successful in API.js listMoviesAPI function`);
    //console.log("Api call that will be made: \n", axios.get(`/api/listMovies`));
    return axios.get(`/api/listMovies`);
}
