const router = require("express").Router();

// Controllers
const {createWorkout,getAllWorkouts,getSingleWorkout,deleteWourkout,updateWourkout} = require('../app/controllers/workoutController')

// GET all workouts
router.get("/", getAllWorkouts);

// POST new workout
router.post("/",createWorkout);

//GET single workout
router.get("/:id",getSingleWorkout);

//DELETE single workout
router.delete("/:id", deleteWourkout);

//UPDATE single workout
router.patch("/:id", updateWourkout);

module.exports = router;
