import { Request, Response, NextFunction } from 'express';
import User from '../../app/models/userModel';

export interface ControllerFunction {
    (req: Request, res: Response, next: NextFunction): Promise<void>;
  }

  interface AuthenticatedRequest extends Request {
    user: User; 
  }

export interface AuthMiddleware {
    (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<object | void>;
  }

  export interface WorkoutControllerFunction {
    (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
  }