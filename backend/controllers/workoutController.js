const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// GET all
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: "Couldn't fetch the workouts" });
  }
};

// GET one
const getWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const workout = await Workout.findById(id);
      res.status(200).json(workout);
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  } catch (error) {
    return res.status(404).json({ error: "Not Found" });
  }
};

// POST one
const addWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  // handling empty fields response
  const emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in the empty fields!", emptyFields });
  }

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE one
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const workout = await Workout.findByIdAndDelete(id);
      res.status(200).json(workout);
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Couldn't delete the workout" });
  }
};

// Update one
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const workout = await Workout.findByIdAndUpdate(id, { ...req.body });
      res.status(200).json(workout);
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Couldn't update the workout" });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  addWorkout,
  deleteWorkout,
  updateWorkout,
};
