const User = require("../models/user")
const Swipes = require("../models/swipes")
const catchAsyncErrors = require('../middleware/catchAsyncError');
const Matches = require("../models/matches")

// swipe like
exports.likeSwipe = catchAsyncErrors(async (req, res, next) => {
  const { swiperId, targetId } = req.body
  let isMatch = false
  let matchDoc
  const matchedData = await Swipes.findOne({ swiperId: targetId, targetId: swiperId, action: 'like' })
  const isAlreadySwiped = await Swipes.findOne({ swiperId: swiperId, targetId: targetId, action: 'like' })
  if(isAlreadySwiped){
    res.send({ status: 405, message: "operation already performed" })
  }
  if (matchedData) {
    isMatch = true
    const newMatch = await Matches.create(
      {
        swiperId,
        targetId,
      }
      )
      matchDoc = newMatch
      await User.updateMany({ _id: { $in: [swiperId, targetId] } },  { $push: { matches: newMatch._id } }, {
        useFindAndModify: false,
        multi: true,
      });
  }
  const addedDoc = await Swipes.create({ swiperId: swiperId, targetId, action: "like" })
  const responseData = {
    status: 200,
    isMatch,
    message: "liked successfully",
    addedDoc
  }
  if (matchDoc) {
    responseData.matchedData = matchDoc
  }
  res.send(responseData)
})


exports.dislikeSwipe = catchAsyncErrors(async (req, res, next) => {
  const { swiperId, targetId } = req.body
  const isAlreadySwiped = await Swipes.findOne({ swiperId: swiperId, targetId: targetId, action: 'dislike' })
  if(isAlreadySwiped){
    res.send({ status: 405, message: "operation already performed" })
  }
  const addedDoc = await Swipes.create({ swiperId: swiperId, targetId, action: "dislike" })
  const responseData = {
    status: 200,
    message: "Disliked successfully",
    addedDoc
  }
  res.send(responseData)
})

