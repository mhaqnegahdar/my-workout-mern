import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";
import { handleZodError } from "../utils/validation";

function ValidateBody(schema: z.ZodSchema) {
  return (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        schema.parse(req.body);
      } catch (error: unknown) {
        logging.error(error);
        let errorObj = {};

        if (error instanceof ZodError) errorObj = handleZodError(error);

        res.status(422).json(errorObj);
        return;
      }

      return originalMethod.call(this, req, res, next);
    };
  };
}

export default ValidateBody;
