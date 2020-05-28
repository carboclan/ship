const mongoose = require('mongoose');
const userModule = require('../models/user');
const UserSchema = userModule.UserSchema;

const Schema = mongoose.Schema;
// Create Project Schema
const ProjectSchema = new Schema({
  ownerId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  productVersion: {
    type: String,
    required: true
  },
  specification: {
    type: String,
    required: true
  },
  objectives: {
      type: String,
      required: true
  },
  strikePrice: {
    type: Number,
    min: 0, // Whole Number
    required: true,
  },
  shippingDuration: {
    type: Number,
    min: 0, // Whole Number, seconds
    required: true,
  },
  exerciseableDuration: {
    type: Number, // Whole Number, seconds
    min: 0,
    required: true,
  },
  skylink: {
    type: String,
    required: false
  },
  contributors: {
    type: [UserSchema],
    required: false,
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Project = mongoose.model("projects", ProjectSchema);