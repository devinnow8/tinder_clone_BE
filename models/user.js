const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Name"],
    unique: true,
  },
  isTnCAccepted: { type: Boolean },
  isOnboardingComplete: { type: Boolean },
  age: { type: Number },
  dob: { type: String },
  phoneNumber: { type: Number, required: [true, "Please Enter Your Phone Number"], unique: true },
  gender: { type: String },
  isShowGender: { type: Boolean },
  includeMeInSearch: { type: Array },
  sexualOrientation: { type: Array },
  isShowOrientation: { type: Boolean },
  interestedIn: { type: Array, required: [true, "Please Specify your interest"] },
  lookingFor: { type: String },
  school: { type: String },
  passions: { type: Array },
  photos: { type: Array },
  currentLocation: { type: String },
  isNotificationOn: { type: Boolean },
});

  userSchema.path('email').validate(async (value) => {
    const emailCount = await mongoose.models.user.countDocuments({email: value });
    return !emailCount;
  }, 'Email already exists');

  userSchema.path('phoneNumber').validate(async (value) => {
    const phoneNumCount = await mongoose.models.user.countDocuments({phoneNumber: value });
    return !phoneNumCount;
  }, 'Phone number already exists');

  userSchema.methods.getJWTToken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET)
  }
  

 module.exports = mongoose.model('user', userSchema);
