import { Router } from "express";

const router = Router();

// Controllers
import {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWourkout,
  updateWourkout,
} from "../app/controllers/workoutController";

// Middlewares
import requireAuth from "../app/middlewares/authMiddleware";

// Auth Middleware
router.use(requireAuth);

// GET all workouts
router.get("/", getAllWorkouts);

// POST new workout
router.post("/", createWorkout);

//GET single workout
router.get("/:id", getSingleWorkout);

//DELETE single workout
router.delete("/:id", deleteWourkout);

//UPDATE single workout
router.patch("/:id", updateWourkout);

export default router;
