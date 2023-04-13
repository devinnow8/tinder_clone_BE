const express = require("express");
const {
  like,
  dislike,
  likeSwipe,
  dislikeSwipe
} = require("../controllers/swipesController");

const swipes = express()

swipes.post("/like", like);
swipes.post("/noAuth/likeSwipe", likeSwipe);
swipes.post("/noAuth/dislikeSwipe", dislikeSwipe);   // added noAuth temporary for testing 

swipes.post("/dislike", dislike);

module.exports = swipes;