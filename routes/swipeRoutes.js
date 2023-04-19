const express = require("express");
const {
  likeSwipe,
  dislikeSwipe
} = require("../controllers/SwipesController");

const swipes = express()

swipes.post("/noAuth/likeSwipe", likeSwipe);
swipes.post("/noAuth/dislikeSwipe", dislikeSwipe);   // added noAuth temporary for testing 


module.exports = swipes;