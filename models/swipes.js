const mongoose = require('mongoose');

const swipesSchema = new mongoose.Schema({
    swiperId: {type: mongoose.Schema.Types.ObjectId, required: [true, "Didn't recieved swiper user"]},
    targetId: {type: mongoose.Schema.Types.ObjectId, required: [true, "Didn't recieved target user"]},
    action: {type: String}
});

module.exports = mongoose.model('swipes', swipesSchema);
