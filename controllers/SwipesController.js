const User = require("../models/user")
const Swipes = require("../models/swipes")
const catchAsyncErrors = require('../middleware/catchAsyncError');
const catchAsyncError = require("../middleware/catchAsyncError");
const swipes = require("../models/swipes");

// swipe like
exports.like = catchAsyncErrors(async (req, res) => {
  const { userId, targetId } = req.body
  if (!targetId || !userId) {
    return res.send({ status: 400, error: "validation error" })
  }

  const user = await Swipes.findOne({ userId: userId })
  const isAlreadySwiped = user.swipes.find((swipe) => swipe.swipedId === targetId)

  if (!isAlreadySwiped) {
    await Swipes.updateOne(
      { userId: userId },
      {
        $push:
        {
          swipes:
          {
            swipedId: targetId,
            type: "like"
          }
        }
      }
    )

    const targetUser = await Swipes.findOne({ userId: targetId })
    const swipe = targetUser.swipes.find((swipe) => swipe.swipedId === userId)

    if (swipe) {
      if (swipe.type === "like") {
        User.updateOne({ _id: userId }, { $push: { matches: targetId } })
        User.updateOne({ _id: targetId }, { $push: { matches: userId } })
      }
    }
    res.send({ status: 200, message: "liked successfully" })
  } else {
    return res.send({ status: 400, error: "already swiped" })
  }
});

exports.likeSwipe = catchAsyncError(async (req, res, next) => {
  const { swiperId, targetId } = req.body
  let isMatch = false
  const matchedData = Swipes.findOne({swiperId:targetId, targetId: swiperId, action: 'like' })
  const isAlreadySwiped = Swipes.findOne({swiperId:swiperId, targetId: targetId, action: 'like' })
  if(isAlreadySwiped){
    res.send({ status: 405, message: "operation already performed" })
  }
  if(matchedData){
    isMatch = true
  }
  const addedDoc = await Swipes.create({
    
      swiperId: swiperId,
      targetId,
      action: "like"
    
  }
  )
  res.send({ status: 200, isMatch, message: "liked successfully",addedDoc })

})

// swipe dislike
exports.dislike = catchAsyncErrors(async (req, res) => {
  const { userId, targetId } = req.body
  if (!targetId || !userId) {
    return res.send({ status: 400, error: "validation error" })
  }

  const user = await Swipes.findOne({ userId: userId })
  const isAlreadySwiped = user.swipes.find((swipe) => swipe.swipedId === targetId)

  if (!isAlreadySwiped) {
    await Swipes.updateOne(
      { userId: userId },
      {
        $push:
        {
          swipes:
          {
            swipedId: targetId,
            type: "dislike"
          }
        }
      }
    )

    res.send({ status: 200, message: "disliked successfully" })
  } else {
    return res.send({ status: 400, error: "already swiped" })
  }

});