import z from "zod";

export const workoutZod = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
  reps: z.number({
    required_error: "Reps is required",
    invalid_type_error: "Reps must be a number",
  }),
  loads: z.number({
    required_error: "Loads is required",
    invalid_type_error: "Loads must be a number",
  }),
});

export type WorkoutSchemaType = z.infer<typeof workoutZod>