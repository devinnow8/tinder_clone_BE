const express = require("express");
const {
  like,
  dislike
} = require("../controllers/SwipesController");

const swipes = express()

swipes.post("/like/:userId/:targetId", like);
swipes.post("/dislike/:userId/:targetId", dislike);

module.exports = swipes;