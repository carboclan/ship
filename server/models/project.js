const mongoose = require('mongoose');
const userModule = require('../models/user');
const UserSchema = userModule.UserSchema;

const Schema = mongoose.Schema;
// Create Project Schema
const ProjectSchema = new Schema({
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
  outcomeObjectives: {
      type: String,
      required: true
  },
  minNumContributor: {
      type: Number,
      required: true
  },
  ownerId: {
      type: String,
      required: true
  },
  contributors: {
      type: [UserSchema],
      required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Project = mongoose.model("projects", ProjectSchema);