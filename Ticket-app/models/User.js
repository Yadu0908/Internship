const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:    { type: String, required: true, unique: true },
  password:    { type: String, required: true },
  date:        { type: Date,   required: true },
  email:       { type: String, required: true, unique: true },
  phone:       { type: String, required: true },
  ticketType:  { type: String, enum: ['General', 'VIP', 'Student'], required: true },
  registeredAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
