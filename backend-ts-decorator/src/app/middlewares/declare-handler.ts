import { NextFunction, Request, Response } from "express";
import { Document, DeleteResult, UpdateResult, ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      mongoGetSingle: Document | undefined;
      mongoGetAll: Document[];
      mongoCreate: Document | undefined;
      mongoUpdate: UpdateResult | undefined;
      mongoDelete: DeleteResult | undefined;

      user: { userId: ObjectId } | undefined;
    }
  }
}

export function declareHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.mongoGetSingle = undefined;
  req.mongoGetAll = [];
  req.mongoCreate = undefined;
  req.mongoUpdate = undefined;
  req.mongoDelete = undefined;

  req.user = undefined;

  next();
}
