const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CacheSchema = new Schema({
  ownerId: {
    type: String,
    required: true,
  },
  contributorId: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Cache = mongoose.model("cache", CacheSchema);
