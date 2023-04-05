const express = require("express");
const {
  getUsers,
  getUsersById,
  createUser,
  updateUser
} = require("../controllers/userController");

const router = express.Router();

router.route("/getUsers").get(getUsers);
router.route("/getUser/:id").get(getUsersById);
router.route("/createUser").get(createUser);
router.route("/updateUser/:id").get(updateUser)


module.exports = router;