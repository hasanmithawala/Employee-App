const express = require("express");
const router = express.Router();
const State = require("../model/statemodel");
const Cities = require("../model/citiesmodel");
router.get("/states", async (req, res) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/cities/:stateId", async (req, res) => {
  const stateId = req.params.stateId;
  try {
    const state = await State.findOne({ _id: stateId });
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    const cities = await Cities.find({ ST: state.ST });

    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
