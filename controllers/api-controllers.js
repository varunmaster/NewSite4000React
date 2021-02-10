const router = require('express').Router();
const omdbToken = process.env.OMDBAPITOKEN
let axios = require('axios');
let fs = require('fs');

function GetMovieInfoAPI(movieName, movieYear) {
    let data = axios.post(`http://www.omdbapi.com/?apikey=${omdbToken}&t=${movieName.trim()}&y=${movieYear.trim()}`)
        .then((res) => {
            //console.log(res.data);
            return res.data;
        }).catch((err) => {
            console.log(`error with api call to omdb: ${err}`);
        });
    return data;
};

function listMovies(req, res) {
    //create object that will contain key-value of movieName: DateAdded and then send to front-end
    let movieDateObj = {};
    let movieFile = fs.readFileSync(`C:\\Data\\Movies\\_movieList.txt`, 'UTF-8').toString().split("\r\n"); //readFileSync(path, encoding, flag/mode)
    for (var i = 0; i < movieFile.length - 1; i++) {
        if (i == 0) {
            //need to trim first element bc there is some weird character causing issues to get dir info
            movieFile[i] = movieFile[i].trim();
            let firstFile = fs.readdirSync(`C:\\Data\\Movies\\${movieFile[i]}`)[0];
            let dateAdded = fs.statSync(`C:\\Data\\Movies\\${movieFile[i]}\\${firstFile}`).mtime.toLocaleString();
            // console.log(`movie we are looking at: ${firstFile}`);
            // console.log(`date added: ${dateAdded}`);
            // console.log("-----------------------------------------------------")
            let movie = movieFile[i];
            movieDateObj[movie] = dateAdded;
        }
        else {
            let firstFile = fs.readdirSync(`C:\\Data\\Movies\\${movieFile[i]}`)[0];
            let dateAdded = fs.statSync(`C:\\Data\\Movies\\${movieFile[i]}\\${firstFile}`).mtime.toLocaleString();
            // console.log(`movie we are looking at:\n${firstFile}`);
            // console.log(`date added:\n${dateAdded}`);
            // console.log("-----------------------------------------------------")
            let movie = movieFile[i];
            movieDateObj[movie] = dateAdded;
        }
    }
    //console.log(movieDateObj);
    //console.log(`keys:\n${Object.keys(movieDateObj)}`);
    //console.log(`values:\n${Object.values(movieDateObj)}`);
    return res.json(movieDateObj);
};

//need to receive the name and year in the request body
function listMovieDetails(req, res) {
    let movieInfo = GetMovieInfoAPI(req.body.name, req.body.year);
    let dataToSend = {};
    movieInfo.then(data => {
        //console.log("something something: ", res);
        dataToSend['Title'] = data.Title;
        dataToSend['Year'] = data.Year;
        dataToSend['Released'] = data.Released;
        dataToSend['Runtime'] = data.Runtime;
        dataToSend['Director'] = data.Director;
        dataToSend['Actors'] = data.Actors;
        dataToSend['Plot'] = data.Plot;
        dataToSend['Poster'] = data.Poster;
        dataToSend['Ratings'] = data.Ratings;
        dataToSend['imdbID'] = data.imdbID;
        //console.log("something  somethinao;sdf:\n", dataToSend);
        return res.json(dataToSend);
    }).catch(err => res.json(`Err with retrieving movie info ${err}`));
};

module.exports = { listMovies, listMovieDetails };
