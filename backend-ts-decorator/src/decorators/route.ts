import {
  Express,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { RouteHandlers } from "../types/route";

function Route(
  method: keyof Express,
  path: `/${string}`,
  middlewares: RequestHandler[]
) {
  return (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;

    const routePath = path;

    const routeHandlers: RouteHandlers =
      Reflect.getMetadata("routeHandlers", target) || new Map();

    if (!routeHandlers.has(method)) {
      routeHandlers.set(method, new Map());
    }

    routeHandlers.get(method)?.set(routePath, [...middlewares, originalMethod]);

    Reflect.defineMetadata("routeHandlers", routeHandlers, target);
  };
}

export default Route;
