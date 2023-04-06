const User = require("../models/user")
const catchAsyncErrors = require('../middleware/catchAsyncError')

// swipe like
exports.like = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.userId
  const targetId = req.params.targetId
});

// swipe dislike
exports.dislike = catchAsyncErrors(async (req, res, next) => {

});