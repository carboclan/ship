import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;
// Create Project Schema
const BufferSchema = new Schema({
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
export default Buffer = model("buffer", BufferSchema);