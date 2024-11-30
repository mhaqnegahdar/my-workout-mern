import http from "http";
import express from "express";

// Config
import "./config/logging-config";
import { DB } from "./config/database-config";
import { SERVER } from "./config/server-config";

// Middlewares
import { routeNotFoundHandler } from "./app/middlewares/route-not-found-handler";
import { corsHandler } from "./app/middlewares/cors-handler";
import { loggingHandler } from "./app/middlewares/logging-handler";

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

const Main = () => {
  logging.info("------------------------");
  logging.info("Initialize APP");
  logging.info("------------------------");
  application.use(express.urlencoded({ extended: true })); //Parsing Request
  application.use(express.json());

  logging.info("--------------------");
  logging.info("Database Connection");
  logging.info("--------------------");

  logging.info("--------------------");
  logging.info("Logging & Configuration");
  logging.info("--------------------");
  application.use(corsHandler);
  application.use(loggingHandler);

  logging.info("--------------------");
  logging.info("Define Controller Routing");
  logging.info("--------------------");
  application.get("/healthcheck", (req, res) => {
    res.status(200).json({ message: "Application is working" });
  });

  logging.info("------------------------");
  logging.info("Route Not Found");
  logging.info("------------------------");
  application.use(routeNotFoundHandler);

  logging.info("------------------------");
  logging.info("Start Server");
  logging.info("------------------------");
  httpServer = http.createServer(application);
  httpServer.listen(SERVER.SERVER_PORT, () => {
    logging.info("------------------------");
    logging.info(`Server Started On ${JSON.stringify(httpServer.address())}`);
    logging.info("------------------------");
  });
};

export const ShutDown = (callback: any) =>
  httpServer && httpServer.close(callback);

Main();
