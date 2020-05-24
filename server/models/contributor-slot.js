const mongoose = require("mongoose");

 const Schema = mongoose.Schema;

 const ContributorSlotSchema = new Schema({
   projectId: {
     type: String,
     required: true,
   },
   requirements: {
     type: String,
     required: true,
   },
   responsibilities: {
     type: String,
     required: true,
   },
   equity: {
     type: Number,
     required: true,
     min: 0,
   },
 });
 module.exports = ContributorSlot = mongoose.model(
   "contributor-slots",
   ContributorSlotSchema
 );