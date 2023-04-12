const User = require("../models/user")
const matches = require("../models/matches")
const catchAsyncErrors = require('../middleware/catchAsyncError');

// Create match with respective Ids
exports.makeMatch = catchAsyncErrors(async (req, res) => {
    const { swiperId, targetId } = req.body;

    const newMatch = await matches.create(
        {
        swiperId,
        targetId,
    }
    )
    return newMatch 

});