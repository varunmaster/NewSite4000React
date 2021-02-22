const express = require("express");
const bodyParser = require("body-parser");
const routes = require('./routes'); //default will look for /routes/index.js
const app = express();// Initialize express and define a port
//const PORT = 4000;

//this is boiler plate info and should just be pasted from other server.js files
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json());
app.set('port', 4000); //5000 for dev only

//list different routes
app.use(routes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Start express on the defined port
app.listen(app.get('port'), () => console.log(`🚀   Server running on port ${app.get('port')}`));
