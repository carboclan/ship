const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Create Schema
const _UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
  User: mongoose.model("users", _UserSchema),
  UserSchema: _UserSchema,
} 