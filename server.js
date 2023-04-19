const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv');
const errorMiddleware = require("./middleware/error");
const privateAuth = require("./auth/privateAuth");

dotenv.config();

const app = express();
app.use(cors({
  origin: '*'
}));

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// await mongoose.connect('mongodb+srv://ashutosh:urWlL9opRqN9pIBu@cluster0.76uhodp.mongodb.net/tinder_clone', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

async function run() {
  try {
    
    await mongoose.connect('mongodb+srv://ashutosh:urWlL9opRqN9pIBu@cluster0.76uhodp.mongodb.net/tinder_clone', {
      autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    //   family: 4, // Use IPv4, skip trying IPv6
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    });
  } catch (error) {
    console.log("err---->",error)
  }
}

run()

app.use(privateAuth);


//Route Imports
const routes = require("./routes");

app.use("", routes);

app.use(errorMiddleware)


module.exports = app;