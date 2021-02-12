import axios from 'axios';

export const listMoviesAPI = () => {
    //console.log("Api call that will be made: \n", axios.get(`/api/listMovies`));
    return axios.get(`/api/listMovies`);
};

export const getMovieDetailsAPI = (movieName) => {
    let name = movieName.split(/(.+?(?=\s\(\d{4}\)))/)[1];
    let year = movieName.split(/(?<=\()(\d{4})(?=\))/)[1];

    return axios.post(`/api/listMovieDetails`, {
        name: name,
        year: year
    });
};

export const listShowsAPI = () => {
    return axios.get(`/api/listShows`);
}
