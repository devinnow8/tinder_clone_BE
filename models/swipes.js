const mongoose = require('mongoose');

const swipesSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  swipes: {
    type: Array
  }
});

module.exports = mongoose.model('swipes', swipesSchema);
