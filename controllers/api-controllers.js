const router = require('express').Router();
const omdbToken = process.env.OMDBAPITOKEN
let axios = require('axios');
let fs = require('fs');

function GetMovieInfoAPI(movieName, movieYear) {
    //console.log("movie: ", movieName);
    //let name = movieName.match(/(?<=)(.*)(.+?(?=\s\(\d{4}\)))/);
    //console.log("regex match: ", name[0]);
    //name = name[0].split(' ').join('+');
    //console.log("split join: ", name);
    //let year = movieName.match(/(?<=\()(\d{4})(?=\))/);
    //console.log("year: ", year[0])

    axios.post(`http://www.omdbapi.com/?apikey=${omdbToken}&t=${movieName}&y=${movieYear}`)
        .then((res) => {
            //console.log(res.data);
            return res.data;
        }).catch((err) => {
            console.log(`error with api call to omdb: ${err}`);
        });
};

//app.get("/listMovies"
function listMovies(req, res) {
    //create object that will contain key-value of movieName: DateAdded and then send to front-end
    let movieDateObj = {};
    let movieFile = fs.readFileSync(`C:\\Data\\Movies\\_movieList.txt`, 'UTF-8').toString().split("\r\n"); //readFileSync(path, encoding, flag/mode)
    for (var i = 0; i < movieFile.length - 1; i++) {
        if (i == 0) {
            //need to trim first element bc there is some weird character causing issues to get dir info
            movieFile[i] = movieFile[i].trim();
            let firstFile = fs.readdirSync(`C:\\Data\\Movies\\${movieFile[i]}`)[0];
            let dateAdded = fs.statSync(`C:\\Data\\Movies\\${movieFile[i]}\\${firstFile}`).birthtime.toLocaleString();
            //console.log(`date added:\n${dateAdded}`);
            let movie = movieFile[i];
            movieDateObj[movie] = dateAdded;
        }
        else {
            let firstFile = fs.readdirSync(`C:\\Data\\Movies\\${movieFile[i]}`)[0];
            let dateAdded = fs.statSync(`C:\\Data\\Movies\\${movieFile[i]}\\${firstFile}`).birthtime.toLocaleString();
            //console.log(`date added:\n${dateAdded}`);
            let movie = movieFile[i];
            movieDateObj[movie] = dateAdded;
        }
    }
    //console.log(movieDateObj);
    //console.log(`keys:\n${Object.keys(movieDateObj)}`);
    //console.log(`values:\n${Object.values(movieDateObj)}`);
    return res.json(movieDateObj);
};

//app.post("/listMovieDetails"
//need to receive the name and year in the request body
function listMovieDetails(req, res) {
    console.log(`Received data: ${req.body}`);
    //use req.body.name and req.body.year to get details and then make api call to omdb
    //use fs to get first added date and imdbId and other data. then send the whole json to front
    const name = req.body.name;
    const year = req.body.year;
    let dateAdded = fs.statSync(`C:\\Data\\Movies\\${name} (${year})`, (err, info) => {
        if (err)
            return res.send(`Err getting file or file does not exist: ${err}`);
        else {
            return info.birthtime.toLocaleString();
        }
    });
    let movieData = GetMovieInfoAPI(name, year);
    let dataToSend = {
        movieData: movieData,
        dateAdded: dateAdded
    };
    //let front-end handle how to parse the data and what data to show/display
    return res.json(dataToSend);
};

module.exports = { listMovies, listMovieDetails };
