const mongoose = require("mongoose");
const { Schema } = mongoose;
const departmentSchema = new Schema({
  name: { type: String },
  departmentid: { type: String },
});
const Department = mongoose.model("departments", departmentSchema);
module.exports = Department;
