const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["I'm coming!", "I'm there in spirit"],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Guest', GuestSchema);
