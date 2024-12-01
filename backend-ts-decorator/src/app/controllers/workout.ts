import { Request, Response } from "express";

// Decorators
import Controller from "../../decorators/controller";
import Route from "../../decorators/route";
import ValidateBody from "../../decorators/validate-body";
import { workoutZod } from "../../types/wourkout";
import ValidateObjectId from "../../decorators/validate-objectid";

@Controller("/workouts")
class Workout {
  @Route("get", "/", [])
  getAllWorkouts(req: Request, res: Response) {
    res.status(200).json({});
  }

  @Route("get", "/:id", [])
  @ValidateObjectId
  getSingleWorkout(req: Request, res: Response) {
    res.status(200).json({});
  }

  @Route("post", "/", [])
  @ValidateBody(workoutZod)
  creatWorkout(req: Request, res: Response) {
    res.status(200).json(req.body);
  }

  @Route("put", "/:id", [])
  @ValidateObjectId
  @ValidateBody(workoutZod)
  updateWorkout(req: Request, res: Response) {
    res.status(200).json({});
  }

  @Route("delete", "/:id", [])
  @ValidateObjectId
  deleteWorkout(req: Request, res: Response) {
    res.status(200).json({});
  }
}

export default Workout;
