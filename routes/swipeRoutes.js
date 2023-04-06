const express = require("express");
const {
  like,
  dislike
} = require("../controllers/swipesController");

const swipes = express()

swipes.post("/like", like);
swipes.post("/dislike", dislike);

module.exports = swipes;