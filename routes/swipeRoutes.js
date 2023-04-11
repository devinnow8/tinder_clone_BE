const express = require("express");
const {
  like,
  dislike,
  likeSwipe
} = require("../controllers/swipesController");

const swipes = express()

swipes.post("/like", like);
swipes.post("/noAuth/likeSwipe", likeSwipe);

swipes.post("/dislike", dislike);

module.exports = swipes;