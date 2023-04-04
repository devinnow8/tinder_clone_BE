

const User = require("../models/user")

const routes = (app) => {


  // get user by id
  app.get('/getUser/:id', (req, res) => {
    User.find({ _id: req.params.id || "" }).then((users) => {
      res.send({ status: 200, data: users })
    }).catch((error) => {
      res.send({ status: 500, error })
    })
  })

  // get user by phone number
  app.get('/getUsers', (req, res) => {
    User.find({ phoneNumber: req.query.phoneNumber || "" }).then((users) => {
      const token = users.getJWTToken()
      res.send({ status: 200, data: users, token })
    }).catch((error) => {
      res.send({ status: 500, error })
    })
  })

  // create user
  app.post('/createUser', (req, res) => {
    if (!req.body.name ||
      !req.body.email ||
      !req.body.dob ||
      !req.body.phoneNumber ||
      !req.body.gender ||
      !req.body.includeMeInSearch ||
      !req.body.sexualOrientation ||
      !req.body.interestedIn ||
      !req.body.lookingFor ||
      !req.body.school ||
      !req.body.passions ||
      !req.body.photos ||
      !req.body.currentLocation) {
      return res.send({ status: 500, error: "Validation error" })
    }
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      dob: req.body.dob,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      isShowGender: req.body.isShowGender,
      includeMeInSearch: req.body.includeMeInSearch,
      sexualOrientation: req.body.sexualOrientation,
      isShowOrientation: req.body.isShowOrientation,
      interestedIn: req.body.interestedIn,
      lookingFor: req.body.lookingFor,
      school: req.body.school,
      passions: req.body.passions,
      photos: req.body.photos,
      currentLocation: req.body.currentLocation,
      isNotificationOn: req.body.isNotificationOn
    })
    newUser.save().then((user) => {
      const token = user.getJWTToken()
      res.send({ status: 200, data: user, token })
    }).catch((error) => {
      console.log("error", error)
      res.send({ status: 500, error })
    })
  })

  // update user  by phone number
  app.post('/updateUser/:id', (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe user was not found!`,
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch((error) => {
        res.status(500).send({
          message: "Error updating user with id=" + id,
          error: error
        });
      });
  })
}

module.exports = routes