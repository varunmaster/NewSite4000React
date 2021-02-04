const router = require("express").Router();
const path = require("path");
const apiRoutes = require('./APIRoutes'); //default will look for /APIRoutes/index.js

router.use("/api", apiRoutes);

router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;
