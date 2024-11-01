const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true }, 
  password: { type: String }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
