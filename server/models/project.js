import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;
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
  contributor: {
      type: Array,
      required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});
export default Project = model("projects", ProjectSchema);