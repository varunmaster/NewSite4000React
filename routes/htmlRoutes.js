const omdbToken = process.env.OMDBAPITOKEN
let axios = require('axios');
let fs = require('fs');

module.exports = function (app) {

    async function getIMDBId(movieName) {
        //console.log("movie: ", movieName);
        let name = movieName.match(/(?<=)(.*)(.+?(?=\s\(\d{4}\)))/);
        //console.log("regex match: ", name[0]);
        name = name[0].split(' ').join('+');
        //console.log("split join: ", name);
        let year = movieName.match(/(?<=\()(\d{4})(?=\))/);
        //console.log("year: ", year[0])

        await axios.post(`http://www.omdbapi.com/?apikey=${omdbToken}&t=${name}&y=${year[0]}`)
        .then((res) => {
            //console.log(res.data);
            return res.data.imdbID;
        }).catch((err) => {
            console.log("error with api call to omdb: ", err);
        });
    }

    app.get("/listMovies", (req, res) => {
        //insert logic here for listing all movies with links to imdb using fs package 
        var movies = fs.readdir("C:\\Data\\Movies", (err, files) => {
            if (err) 
                return res.send("error retrieving movies: ", err);
            else {
                let moviesHTML = `<Table border='1'><tr><th><b>Item</b></th><th><b>Movie Name</b></th><th><b>First added</b></th></tr>`;
                
                for(var i = 0; i < files.length-1; i++) {
                    var dateAdded = fs.statSync(`C:\\Data\\Movies\\${files[i]}`).birthtime.toLocaleString(); 

                    // Can't use by Async function bc by the time the callback is returned, the page is already rendered...kinda like a race condition
                    // fs.statSync(`C:\\Data\\Movies\\${files[i]}`, (err,info) => {
                    //     if (err)
                    //         console.log("Error retrieving movie info: ", err);
                    //     else {
                    //         //console.log("got to here at least");
                    //         console.log(info.birthtime.toLocaleString());
                    //         dateAdded = info.birthtime.toLocaleString();
                    //     }
                    // });
                    //console.log("Dateadded variable: ", dateAdded);

                    moviesHTML += `<tr><td>${i+1}</td><td><a href='https://www.imdb.com/title/${getIMDBId(files[i])} target=_blank'> ${files[i]} </a></td><td>${dateAdded}</td></tr>`;
                }

                moviesHTML += `<tr><td><b>Count</b></td><td><b>${files.length}</b></tr></td></tr></Table>`;
                return res.send(moviesHTML);
            }
        });
        //res.send(movies);
    });

    app.get("/listShows", (req, res) => {
        //insert logic here for listing all movies with links to imdb using fs package 
        res.send();
    });
};
