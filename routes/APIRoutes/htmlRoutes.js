const router = require('express').Router();
const {
    listMovies,
    listMovieDetails
} = require("../../controllers/api-controllers.js");

router.route("/listMovies").get(listMovies);

router.route("/listMovieDetails").post(listMovieDetails);

module.exports = router;
