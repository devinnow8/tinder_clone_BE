const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv');
const errorMiddleware = require("./middleware/error");
import { privateAuth } from "./auth/privateAuth";

dotenv.config();

const app = express();
app.use(cors({
  origin: '*'
}));

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

mongoose.connect('mongodb+srv://msharma:msharma@cluster0.fx1aae9.mongodb.net/tinder_clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(privateAuth);


//Route Imports
const routes = require("./routes");

app.use("", routes);

app.use(errorMiddleware)


module.exports = app;