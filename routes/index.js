const express = require("express");
const userRoutes = require("./userRoutes");
const swipeRoutes = require("./swipeRoutes");
const matchesRoutes = require("./matchesRoutes");

const router = express.Router();

router.use(userRoutes)
router.use(swipeRoutes)
router.use(matchesRoutes)
module.exports = router;