const express = require("express");
const {
  getUsers,
  getUsersById,
  createUser,
  updateUser
} = require("../controllers/userController");

const users = express()

users.get("/noAuth/getUsers", getUsers);
users.get("/noAuth/getUser/:id", getUsersById);
users.post("/noAuth/createUser", createUser);
users.post("/updateUser/:id", updateUser)


module.exports = users;