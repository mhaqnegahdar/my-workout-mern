import { Model, model, Schema } from "mongoose";
import { WorkoutSchemaType } from "../../types/models/wourkout";

interface WorkoutModelType extends Model<WorkoutSchemaType> {}

const workoutSchema = new Schema<WorkoutSchemaType>(
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

export const WorkoutModel = model<WorkoutSchemaType, WorkoutModelType>(
  "Workout",
  workoutSchema
);
