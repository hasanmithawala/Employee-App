const mongoose = require("mongoose");
const { Schema } = mongoose;
const employeeSchema = new Schema({
  employeeCode: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (value) {
        const existingEmployee = await mongoose.models.employees.findOne({
          employeeCode: value,
        });
        return !existingEmployee;
      },
      message: (props) =>
        `${props.value} is already taken, try another emp code`,
    },
  },
  employeeName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (value) {
        const existingEmployee = await mongoose.models.employees.findOne({
          // regular expression for case insensitiveness
          employeeName: { $regex: new RegExp(`^${value}$`, "i") },
        });

        return !existingEmployee;
      },
      message: (props) =>
        `${props.value} is already taken, try another employee name`,
    },
  },

  department: { type: String, required: true },
  designation: { type: String, required: true },
  dob: {
    type: Date,
    required: true,
  },
  doj: {
    type: Date,
    required: true,
  },
  state: { type: String, required: true },
  city: { type: String, required: true },
});
const Employee = mongoose.model("employees", employeeSchema);
module.exports = Employee;
