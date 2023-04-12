const mongoose = require('mongoose');

const matchesSchema = new mongoose.Schema({
    swiperId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'},
    targetId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'},
});

module.exports = mongoose.model('matches', matchesSchema);
