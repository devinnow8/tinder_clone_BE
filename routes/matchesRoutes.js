const express = require("express");
const {
    getMatches,
} = require("../controllers/matchesController");

const matches = express();

matches.get("/noAuth/getMatches/:id", getMatches);// added noAuth temporary for testing 

module.exports = matches;