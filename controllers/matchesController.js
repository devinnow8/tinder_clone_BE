const User = require("../models/user")
const Matches = require("../models/matches")
const catchAsyncErrors = require('../middleware/catchAsyncError');


// Create match with respective Ids
exports.makeMatch = catchAsyncErrors(async (req, res) => {
    const { swiperId, targetId } = req.body;
    
    const newMatch = await Matches.create(
        {
            swiperId,
            targetId,
        }
        )
        return newMatch 
        
    });
    
    // get matches for user
exports.getMatches = catchAsyncErrors(async (req, res) => {
    const userId = req.params.id
    const allMatches = await Matches.find({ $or:[  {'swiperId':userId}, {'targetId':userId} ]})
    res.send({
        status: 200,
        allMatches
    })
});