import { NextFunction, Request, Response } from "express";
import { Document, DeleteResult, UpdateResult } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      mongoGetSingle: Document | undefined;
      mongoGetAll: Document[];
      mongoCreate: Document | undefined;
      mongoUpdate: UpdateResult | undefined;
      mongoDelete: DeleteResult | undefined;
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

  next();
}
