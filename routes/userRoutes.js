const express = require("express");
const {
  getUsers,
  getUsersById,
  createUser,
  updateUser
} = require("../controllers/userController");

const users = express()

users.get("/getUsers", getUsers);
users.get("/getUser/:id", getUsersById);
users.post("/createUser", createUser);
users.post("/updateUser/:id", updateUser)


module.exports = users;