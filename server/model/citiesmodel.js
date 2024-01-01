const mongoose = require("mongoose");
const { Schema } = mongoose;
const citySchema = new Schema({
  _id: Number,
  PIN: Number,
  ST: Number,
  CT: String,
});
const City = mongoose.model("cities", citySchema);
module.exports = City;
