const mongoose = require('mongoose');

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

 module.exports = mongoose.model('user', userSchema);
