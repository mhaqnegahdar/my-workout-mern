const express = require("express");
const requireAuth = require("../middlewares/requireAuth");

//controller
const {
  getWorkouts,
  addWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// instance of the route obj
const router = express.Router();

// handling reaquests

// Require Auth for all workouts routes
router.use(requireAuth);

// GET all workouts
router.get("/", getWorkouts);

// GET a workout
router.get("/:id", getWorkout);

// POST a workout
router.post("/", addWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

//UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
