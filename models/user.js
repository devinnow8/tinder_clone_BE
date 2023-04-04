const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    dob: String,
    phoneNumber: Number,
    gender: String,
    isShowGender: Boolean,
    includeMeInSearch: Array,
    sexualOrientation: Array,
    isShowOrientation: Boolean,
    interestedIn: Array,
    lookingFor: String,
    school: String,
    passions: Array,
    photos: Array,
    currentLocation: String,
    isNotificationOn: Boolean
  });

  userSchema.methods.getJWTToken = function (){
    console.log("JWT_SECRET", process.env.JWT_SECRET)
    return jwt.sign({id: this._id}, process.env.JWT_SECRET)
  }
  

 module.exports = mongoose.model('user', userSchema);
