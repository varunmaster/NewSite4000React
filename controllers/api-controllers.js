const router = require('express').Router();
const omdbToken = process.env.OMDBAPITOKEN
let axios = require('axios');
let fs = require('fs');

async function GetMovieInfoAPI(movieName, movieYear) {
    //console.log("movie: ", movieName);
    //let name = movieName.match(/(?<=)(.*)(.+?(?=\s\(\d{4}\)))/);
    //console.log("regex match: ", name[0]);
    //name = name[0].split(' ').join('+');
    //console.log("split join: ", name);
    //let year = movieName.match(/(?<=\()(\d{4})(?=\))/);
    //console.log("year: ", year[0])

    await axios.post(`http://www.omdbapi.com/?apikey=${omdbToken}&t=${movieName}&y=${movieYear}`)
        .then((res) => {
            //console.log(res.data);
            return res.data;
        }).catch((err) => {
            console.log(`error with api call to omdb: ${err}`);
        });
};

//app.get("/listMovies"
async function listMovies(req, res) {
    //insert logic here for listing all movies with links to imdb using fs package 
    // var movies = fs.readdir("C:\\Data\\Movies", (err, files) => {
    //     if (err) 
    //         return res.send("error retrieving movies: ", err);
    //     else {
    //         let moviesHTML = `<Table border='1'><tr><th><b>Item</b></th><th><b>Movie Name</b></th><th><b>First added</b></th></tr>`;
    //         for(var i = 0; i < files.length-1; i++) {
    //             var dateAdded = fs.statSync(`C:\\Data\\Movies\\${files[i]}`).birthtime.toLocaleString(); 
    //             // Can't use by Async function bc by the time the callback is returned, the page is already rendered...kinda like a race condition
    //             // fs.statSync(`C:\\Data\\Movies\\${files[i]}`, (err,info) => {
    //             //     if (err)
    //             //         console.log("Error retrieving movie info: ", err);
    //             //     else {
    //             //         //console.log("got to here at least");
    //             //         console.log(info.birthtime.toLocaleString());
    //             //         dateAdded = info.birthtime.toLocaleString();
    //             //     }
    //             // });
    //             //console.log("Dateadded variable: ", dateAdded);
    //             moviesHTML += `<tr><td>${i+1}</td><td><a href='https://www.imdb.com/title/${getIMDBId(files[i])} target=_blank'> ${files[i]} </a></td><td>${dateAdded}</td></tr>`;
    //         }
    //         moviesHTML += `<tr><td><b>Count</b></td><td><b>${files.length}</b></tr></td></tr></Table>`;
    //         return res.send(moviesHTML);
    //     }
    // });
    //res.send(movies);

        //create object that will contain key-value of movieName: DateAdded and then send to front
    let movieDateObj = {};

    var movies = await fs.readdir(`C:\\Data\\Movies`, (err, files) => {
        if (err)
            return res.send(`Error listing movies from fs: ${err}`);
        else {
            //console.log(files);
            //loop through each movie find the birthtime and store it in movieDateObj
            files.map(movie => {
                fs.statSync(`C:\\Data\\Movies\\${movie}`, (err, info) => {
                    if (err)
                        return res.send(`Err with getting movie date info: ${err}`);
                    else {
                        //movie = this.super(movie);
                        movieDateObj.super(movie) = info.birthtime.toLocaleString();
                    }
                });
            });
        }
    });
    //return res.json(movieDateObj);
    return res.json("{'testKey': 'testValue'}");
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
