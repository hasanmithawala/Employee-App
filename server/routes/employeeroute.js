const express = require("express");
const router = express.Router();
const Employee = require("../model/employeemodel");
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/employee/add", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    console.log(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
