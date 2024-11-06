const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
  password: { type: String }, 
  googleId: { type: String }, 
  loginMethod: { type: String, enum: ['google', 'local'], required: true },
  createdAt: { type: Date, default: Date.now },
  settings: {
    Theme: { type: String, enum: ['Light', 'Dark'], default: 'Light'}
  }
});

module.exports = mongoose.model('User', userSchema);
