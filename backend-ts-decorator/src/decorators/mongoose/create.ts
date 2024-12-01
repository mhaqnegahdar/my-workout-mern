import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

function MongoCreate(model: Model<any>) {
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
      // Create Logic Here

      try {
        const newDocument = await model.create(req.body);
        req.mongoCreate = newDocument;
        logging.info(`------------------------ `);
        logging.info(`Created a `, model.modelName);
        logging.info(`------------------------ `);
      } catch (error) {
        logging.info(`------------------------ `);
        logging.info(`Error Creating a `, model.modelName, error);
        logging.info(`------------------------ `);
        res.status(500).json(error);
        return;
      }

      return originalMethod.call(this, req, res, next);
    };
  };
}

export default MongoCreate;
