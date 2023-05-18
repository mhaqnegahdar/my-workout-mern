const express = require("express");

//controller
const {
  getWorkouts,
  addWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// instance of the route obj
const route = express.Router();

// handling reaquests

// GET all workouts
route.get("/", getWorkouts);

// GET a workout
route.get("/:id", getWorkout);

// POST a workout
route.post("/", addWorkout);

// DELETE a workout
route.delete("/:id", deleteWorkout);

//UPDATE a workout
route.patch("/:id", updateWorkout);

module.exports = route;
