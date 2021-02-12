const router = require('express').Router();
const {
    listMovies,
    listMovieDetails,
    listShows,
    listShowDetails
} = require("../../controllers/api-controllers.js");

router.route("/listMovies").get(listMovies);

router.route("/listMovieDetails").post(listMovieDetails);

router.route("/listShows").get(listShows);

router.route("/listShowDetails").post(listShowDetails);

module.exports = router;
