import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

function MongoUpdate(model: Model<any>) {
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
        const document = await model.updateOne({_id:req.params.id},req.body);
        req.mongoUpdate = document;
        logging.info(`------------------------ `);
        logging.info(`Updated a `, model.modelName);
        logging.info(`------------------------ `);
      } catch (error) {
        logging.info(`------------------------ `);
        logging.info(`Error updating a `, model.modelName, error);
        logging.info(`------------------------ `);
        res.status(500).json(error);
        return;
      }

      return originalMethod.call(this, req, res, next);
    };
  };
}

export default MongoUpdate;
