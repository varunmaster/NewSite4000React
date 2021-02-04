const router = require('express').Router();
const htmlRoutes = require("./htmlRoutes.js");

router.use("", htmlRoutes);
module.exports = router;
