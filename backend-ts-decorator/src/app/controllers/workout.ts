import { Request, Response } from "express";

// Decorators
import Controller from "../../decorators/controller";
import Route from "../../decorators/route";
import ValidateBody from "../../decorators/validate-body";
import ValidateObjectId from "../../decorators/validate-objectid";
import MongoCreate from "../../decorators/mongoose/create";

// Schemas
import { workoutZod } from "../../types/models/wourkout";

// Models
import { WorkoutModel } from "../models/workout";
import MongoGetSingle from "../../decorators/mongoose/getSingle";
import MongoGetAll from "../../decorators/mongoose/getAll";
import MongoUpdate from "../../decorators/mongoose/update";
import MongoDelete from "../../decorators/mongoose/delete";

@Controller("/workouts")
class Workout {
  @Route("get", "/", [])
  @MongoGetAll(WorkoutModel)
  getAllWorkouts(req: Request, res: Response) {
    res.status(200).json(req.mongoGetAll);
  }

  @Route("get", "/:id", [])
  @ValidateObjectId
  @MongoGetSingle(WorkoutModel)
  getSingleWorkout(req: Request, res: Response) {
    res.status(200).json(req.mongoGetSingle);
  }

  @Route("post", "/", [])
  @ValidateBody(workoutZod)
  @MongoCreate(WorkoutModel)
  creatWorkout(req: Request, res: Response) {
    res.status(200).json(req.mongoCreate);
  }

  @Route("put", "/:id", [])
  @ValidateObjectId
  @ValidateBody(workoutZod)
  @MongoUpdate(WorkoutModel)
  updateWorkout(req: Request, res: Response) {
    res.status(200).json(req.mongoUpdate);
  }

  @Route("delete", "/:id", [])
  @ValidateObjectId
  @MongoDelete(WorkoutModel)
  deleteWorkout(req: Request, res: Response) {
    res.status(200).json(req.mongoDelete);
  }
}

export default Workout;
