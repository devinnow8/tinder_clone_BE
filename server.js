const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv');

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

require('./routes')(app)

// app.listen(8000, () => {
//   console.log('Server listening on port 8000');
// });

module.exports = app;