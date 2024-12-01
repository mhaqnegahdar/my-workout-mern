import { model, Schema } from "mongoose";
import { WorkoutType } from "../../types/wourkout";

const workoutSchema = new Schema<WorkoutType>(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    loads: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const WorkoutModel=  model("Workout", workoutSchema);
