import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

function MongoDelete(model: Model<any>) {
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
        const deleted = await model.deleteOne({_id:req.params.id});
        req.mongoDelete = deleted;
        logging.info(`------------------------ `);
        logging.info(`Deleted a `, model.modelName);
        logging.info(`------------------------ `);
      } catch (error) {
        logging.info(`------------------------ `);
        logging.info(`Error deleling a `, model.modelName, error);
        logging.info(`------------------------ `);
        res.status(500).json(error);
        return;
      }

      return originalMethod.call(this, req, res, next);
    };
  };
}

export default MongoDelete;
