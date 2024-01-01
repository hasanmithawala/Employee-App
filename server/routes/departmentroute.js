const express = require("express");
const Department = require("../model/departmentmodel");
const Designation = require("../model/designationmodel");
const router = express.Router();
router.get("/departments", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/departments/:departmentName/designations", async (req, res) => {
  try {
    const departmentName = req.params.departmentName;
    const designations = await Designation.find({
      departmentName: departmentName,
    });
    const designationNames = designations.map(
      (designation) => designation.name
    );
    res.json(designationNames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
