const mongoose = require("mongoose");
const { Schema } = mongoose;
const stateSchema = new Schema({
  _id: String,
  ST: Number,
  STSN: String,
  STNM: String,
  CNTR: String,
  ZN: String,
  ISUT: Boolean,
});
const State = mongoose.model("states", stateSchema);
module.exports = State;
