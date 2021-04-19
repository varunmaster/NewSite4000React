const router = require('express').Router();
const omdbToken = process.env.OMDBAPITOKEN
let axios = require('axios');
let fs = require('fs');
const redis = require('redis');

//defaulting year to null for api call for shows
function GetMovieInfoAPI(movieName, movieYear = null) {
    if (movieYear === null) {
        let data = axios.post(`http://www.omdbapi.com/?apikey=${omdbToken}&t=${movieName.trim()}`)
            .then((res) => {
                //console.log(res.data);
                return res.data;
            }).catch((err) => {
                console.log(`error with api call to omdb: ${err}`);
            });
        return data;
    }
    else {
        let data = axios.post(`http://www.omdbapi.com/?apikey=${omdbToken}&t=${movieName.trim()}&y=${movieYear.trim()}`)
            .then((res) => {
                //console.log(res.data);
                return res.data;
            }).catch((err) => {
                console.log(`error with api call to omdb: ${err}`);
            });
        return data;
    }
};

function listMovies(req, res) {
    //create object that will contain key-value of movieName: DateAdded and then send to front-end
    let movieFile = fs.readFileSync(`C:\\Data\\Movies\\_movieList.txt`, 'UTF-8').toString().split("\r\n"); //readFileSync(path, encoding, flag/mode)
    let movieFileDateTime = fs.statSync(`C:\\Data\\Movies\\_movieList.txt`).mtime.toLocaleString();
    let lastCheckDateTime = "";
    const redisClient = redis.createClient({
        port: 6379,                         // replace with your port
        host: '192.168.1.191'//,              // replace with your hostanme or IP address
        //password: process.env.PWD//,        // replace with your password
        // optional, if using SSL
        // use `fs.readFile[Sync]` or another method to bring these values in
        //tls       : {
        //  key  : stringValueOfKeyFile,  
        //  cert : stringValueOfCertFile,
        //  ca   : [ stringValueOfCaCertFile ]
        //}
    });
    redisClient.on("error", function (error) {
        console.error("error connecting with redis docker server: ", error);
    });
    redisClient.on("connect", () => {
        console.error("successful connection to redis docker server");
    });
    redisClient.get("_movieListTime", (err, val) => {
        if (err)
            console.log("error with retrieving _movieListTime file from redis: ", err);
        else {
            //console.log("file last time: ", movieFileDateTime);
            console.log("got _movieListTime from cache: ", val);
            lastCheckDateTime = val;

            if (movieFileDateTime > lastCheckDateTime) {
                let movieDateObj = {};
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
                // Add logic here for connecting to Redis and then updating the movieFile key
                const redisClient = redis.createClient({
                    port: 6379,                         // replace with your port
                    host: '192.168.1.191'//,              // replace with your hostanme or IP address
                    //password: process.env.PWD//,        // replace with your password
                    // optional, if using SSL
                    // use `fs.readFile[Sync]` or another method to bring these values in
                    //tls       : {
                    //  key  : stringValueOfKeyFile,  
                    //  cert : stringValueOfCertFile,
                    //  ca   : [ stringValueOfCaCertFile ]
                    //}
                });
                redisClient.on("error", function (error) {
                    console.error("error connecting with redis docker server: ", error);
                });
                redisClient.on("connect", () => {
                    console.error("successful connection to redis docker server");
                });

                redisClient.set("_movieList", JSON.stringify(movieDateObj), (err, reply) => {
                    if (err)
                        console.log("Err setting redis key-value for _movieList: ", err);
                    else {
                        console.log("Movie file was updated recently...getting info and setting: ", reply);
                    }
                });

                lastCheckDateTime = new Date();
                //lastCheckDateTime;

                redisClient.set("_movieListTime", lastCheckDateTime.toLocaleString(), (err, reply) => {
                    if (err)
                        console.log("Err setting redis key-value for _movieListTime: ", err);
                    else {
                        console.log("Updated the time value on key _movieListTime: ", reply);
                    }
                });
                console.log("quitting connection to redis server");
                redisClient.quit();

                return res.json(movieDateObj);
            } else {
                // Add logic here for connecting and retrieving the values for movieFile key
                const redisClient = redis.createClient({
                    port: 6379,                         // replace with your port
                    host: '192.168.1.191'//,              // replace with your hostanme or IP address
                    //password: process.env.PWD//,        // replace with your password
                    // optional, if using SSL
                    // use `fs.readFile[Sync]` or another method to bring these values in
                    //tls       : {
                    //  key  : stringValueOfKeyFile,  
                    //  cert : stringValueOfCertFile,
                    //  ca   : [ stringValueOfCaCertFile ]
                    //}
                });
                redisClient.on("error", function (error) {
                    console.error("error connecting with redis docker server: ", error);
                });
                redisClient.on("connect", () => {
                    console.error("successful connection to redis docker server");
                });

                redisClient.get("_movieList", (err, val) => {
                    if (err)
                        console.log("error with retrieving _movieList file from redis: ", err);
                    else {
                        console.log("got _movieList from cache");
                        let movieDateObjJSON = JSON.parse(val);

                        console.log("quitting connection to redis server");
                        redisClient.quit();
                        return res.json(movieDateObjJSON);
                    }
                });
            }
            console.log("quitting connection to redis server");
            redisClient.quit();
        }
    });
};

//need to receive the name and year in the request body
function listMovieDetails(req, res) {
    const redisClient = redis.createClient({
        port: 6379,                         // replace with your port
        host: '192.168.1.191'//,              // replace with your hostanme or IP address
        //password: process.env.PWD//,        // replace with your password
        // optional, if using SSL
        // use `fs.readFile[Sync]` or another method to bring these values in
        //tls       : {
        //  key  : stringValueOfKeyFile,  
        //  cert : stringValueOfCertFile,
        //  ca   : [ stringValueOfCaCertFile ]
        //}
    });
    redisClient.on("error", function (error) {
        console.error("error connecting with redis docker server: ", error);
    });
    redisClient.on("connect", () => {
        console.error("successful connection to redis docker server");
    });

    let movieName = req.body.name + " " + "(" + req.body.year + ")";
    redisClient.get(movieName, (err, val) => {
        if (err)
            console.log("error quering redis: ", err);
        else {
            //console.log("querying for movie: ", movieName, " and data returned: ", val);
            if (val === null) {
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
                    //console.log("setting redis data for: ", movieName, " with data: \n", dataToSend);
                    let dataToSendJSONString = JSON.stringify(dataToSend);
                    //console.log("ooga booga:\n", dataToSend);
                    redisClient.set(movieName, dataToSendJSONString, (err, reply) => {
                        if (err)
                            console.log("Err setting redis key-value: ", err);
                        else {
                            console.log(movieName, " not in redis, setting now: ", reply);
                        }
                    });
                    console.log("quitting connection to redis server");
                    redisClient.quit();
                    return res.json(dataToSend);
                }).catch(err => {
                    console.log("quitting connection to redis server");
                    redisClient.quit();
                    return res.json(`Err with retrieving movie info ${err}`);
                });
            }
            else {
                console.log("got data from redis for movie: ", movieName);
                console.log("quitting connection to redis server");
                redisClient.quit();
                return res.json(JSON.parse(val));
            }
            //redisClient.quit();
        }
    });
};

function listShows(req, res) {
    //console.log("hello :)");
    let showDateObj = {};
    let shows = [];
    shows = fs.readdirSync(`E:\\Shows`, (err, dirs) => {
        if (err)
            console.log("err retrieving all shows dir: ", err);
        //return res.json(err);
        else {
            console.log(dirs);
        }
    });
    shows.map(show => {
        let date = fs.statSync(`E:\\Shows\\${show}`).birthtime.toLocaleString();
        showDateObj[show] = date;
    });
    //console.log("look here dummy: ", showDateObj);
    return res.json(showDateObj);
}

function listShowDetails(req, res) {
    const redisClient = redis.createClient({
        port: 6379,                         // replace with your port
        host: '192.168.1.191'//,              // replace with your hostanme or IP address
        //password: process.env.PWD//,        // replace with your password
        // optional, if using SSL
        // use `fs.readFile[Sync]` or another method to bring these values in
        //tls       : {
        //  key  : stringValueOfKeyFile,  
        //  cert : stringValueOfCertFile,
        //  ca   : [ stringValueOfCaCertFile ]
        //}
    });
    redisClient.on("error", function (error) {
        console.error("error connecting with redis docker server: ", error);
    });
    redisClient.on("connect", () => {
        console.error("successful connection to redis docker server");
    });
    redisClient.get(req.body.name, (err, val) => {
        if (err)
            console.log("error quering redis: ", err);
        else {
            //console.log("querying for movie: ", movieName, " and data returned: ", val);
            if (val === null) {
                let showInfo = GetMovieInfoAPI(req.body.name);
                let dataToSend = {};
                showInfo.then(data => {
                    //console.log("something something: ", res);
                    dataToSend['Title'] = data.Title;
                    dataToSend['Year'] = data.Year;
                    dataToSend['Released'] = data.Released;
                    dataToSend['Genre'] = data.Genre;
                    dataToSend['Actors'] = data.Actors;
                    dataToSend['Plot'] = data.Plot;
                    dataToSend['Poster'] = data.Poster;
                    dataToSend['Ratings'] = data.Ratings;
                    dataToSend['imdbID'] = data.imdbID;
                    dataToSend['totalSeasons'] = data.totalSeasons;
                    //console.log("something  somethinao;sdf:\n", dataToSend);
                    //console.log("setting redis data for: ", movieName, " with data: \n", dataToSend);
                    let dataToSendJSONString = JSON.stringify(dataToSend);
                    //console.log("ooga booga:\n", dataToSend);
                    redisClient.set(req.body.name, dataToSendJSONString, (err, reply) => {
                        if (err)
                            console.log("Err setting redis key-value: ", err);
                        else {
                            console.log(req.body.name, " not in redis, setting now: ", reply);
                        }
                    });
                    console.log("quitting connection to redis server");
                    redisClient.quit();
                    return res.json(dataToSend);
                }).catch(err => {
                    console.log("quitting connection to redis server");
                    redisClient.quit();
                    return res.json(`Err with retrieving movie info ${err}`);
                });
            }
            else {
                console.log("got data from redis for show: ", req.body.name);
                console.log("quitting connection to redis server");
                redisClient.quit();
                return res.json(JSON.parse(val));
            }
            //redisClient.quit();
        }
    });
};

module.exports = { listMovies, listMovieDetails, listShows, listShowDetails };
