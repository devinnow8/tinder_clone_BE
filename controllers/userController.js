const User = require("../models/user")
const catchAsyncErrors = require('../middleware/catchAsyncError')

// get user by phone number
exports.getUsers = catchAsyncErrors(async (req, res, next) => {
    console.log("getUsers")
    const users = await User.findOne({ phoneNumber: req.query.phoneNumber || "" })
    const token = users.getJWTToken()
    res.status(200).json({
      success: true,
      users,
      token
    })
  });

// get user by id
  exports.getUsersById = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find({ _id: req.params.id || "" })
    const token = users.getJWTToken()
    res.status(200).json({
      success: true,
      users,
      token
    })
  });  

// create user
exports.createUser = catchAsyncErrors(async (req, res, next) => {
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

      const createdUser = await User.save(newUser)
      const token = users.getJWTToken()
      res.status(200).json({
        success: true,
        createdUser,
        token
      })
  });

  // update user
  exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    res.status(200).json({
      success: true,
      updatedUser,
    })
  });  