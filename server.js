const express = require("express");
const bodyParser = require("body-parser");

// Initialize express and define a port
const app = express();
const PORT = 4000;

//this is boiler plate info and should just be pasted from other server.js files
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));
// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json());

//list different routes
require("./routes/htmlRoutes")(app);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀   Server running on port ${PORT}`));
