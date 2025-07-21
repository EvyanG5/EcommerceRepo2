const mongoose = require('mongoose');

const candySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  flavor: {
    type: String,
    required: true,
  },
  sweetnessLevel: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  candySchema: [candySchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
