import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

function ValidateObjectId(
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value;
  descriptor.value = function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!isValidObjectId(req.params.id)) {
      logging.error("Invalid Id Parameter");
      res.status(422).json({ error: "Invalid Id Parameter" });
      return;
    }

    return originalMethod.call(this, req, res, next);
  };
}

export default ValidateObjectId;
