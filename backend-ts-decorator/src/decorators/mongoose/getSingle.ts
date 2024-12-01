import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

function MongoGetSingle(model: Model<any>) {
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
        const document = await model.findById(req.params.id);
        req.mongoGetSingle = document;
        logging.info(`------------------------ `);
        logging.info(`Found a `, model.modelName);
        logging.info(`------------------------ `);
      } catch (error) {
        logging.info(`------------------------ `);
        logging.info(`Error getting a `, model.modelName, error);
        logging.info(`------------------------ `);
        res.status(500).json(error);
        return;
      }

      return originalMethod.call(this, req, res, next);
    };
  };
}

export default MongoGetSingle;
