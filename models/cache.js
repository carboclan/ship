const mongoose = require('mongoose')

const Schema = mongoose.Schema;
// Create Project Schema
const CacheSchema = new Schema({
  ownerId: {
      type: String,
      required: true
  },
  contributorId: {
      type: String,
      required: true
  },
  projectId: {
      type: String,
      required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Cache = mongoose.model("cache", CacheSchema);