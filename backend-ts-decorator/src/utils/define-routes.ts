import { Express } from "express";
import { RouteHandlers } from "../types/route";

function defineRoutes(controllers: any[], application: Express) {
  for (const Controller of controllers) {
    const controller = new Controller();

    const routeHandlers: RouteHandlers = Reflect.getMetadata(
      "routeHandlers",
      controller
    );
    const baseRoute = Reflect.getMetadata("baseRoute", controller.constructor);

    const methods = Array.from(routeHandlers.keys());

    for (const method of methods) {
      const routes = routeHandlers.get(method);

      if (routes != null)
        for (const route of Array.from(routes.keys())) {
          const middlewares = routes.get(route);

          if (middlewares) application[method](baseRoute + route, middlewares);
        }
    }
  }
}

export default defineRoutes;
