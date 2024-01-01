const mongoose = require("mongoose");
const { Schema } = mongoose;
const designationSchema = new Schema({
  name: { type: String },
  departmentName: { type: String },
  departmentid: { type: String },
});
const Designation = mongoose.model("designations", designationSchema);
module.exports = Designation;
