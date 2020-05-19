const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  ownerId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  productVersion: {
    type: String,
    required: true,
  },
  specification: {
    type: String,
    required: true,
  },
  objectives: {
    type: String,
    required: true,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Project = mongoose.model("projects", ProjectSchema);
