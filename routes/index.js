const express = require("express");
const userRoutes = require("./userRoutes");
const swipeRoutes = require("./swipeRoutes");

const router = express.Router();

router.use(userRoutes)
router.use(swipeRoutes)
module.exports = router;