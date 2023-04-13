const User = require("../models/user")
const Swipe = require("../models/swipes")
const catchAsyncErrors = require('../middleware/catchAsyncError')

// get user by phone number
exports.getUsers = catchAsyncErrors(async (req, res) => {
  const users = await User.findOne({ phoneNumber: req.query.phoneNumber || "" })
  const token = users.getJWTToken()
  res.status(200).json({
    success: true,
    users,
    token
  })
});

// get user by id
exports.getUsersById = catchAsyncErrors(async (req, res) => {
  const users = await User.findOne({ _id: req.params.id || "" })
  const token = users.getJWTToken()
  res.status(200).json({
    success: true,
    users,
    token
  })
});

// create user
exports.createUser = catchAsyncErrors(async (req, res) => {
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
    isNotificationOn: req.body.isNotificationOn,
    isTnCAccepted: req.body.isTnCAccepted,
    isOnboardingComplete: req.body.isOnboardingComplete,
    matches: []
  });
  console.log("requrest to create a new user received!!!!");
  console.log(req.body);
  const createdUser = await User.create(newUser)
  const token = createdUser.getJWTToken()

  res.status(200).json({
    success: true,
    createdUser,
    token
  })
});

// update user
exports.updateUser = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
    new: true,
  });
  res.status(200).json({
    success: true,
    updatedUser,
  })
});  

// get profiles 
exports.getProfiles = catchAsyncErrors(async (req, res) => {
  console.log(req.body);
  const {interest} = req.body
  const profiles = await User.find({interestedIn: interest});
  res.status(200).json({
    success: true,
    profiles,
  })
}); 