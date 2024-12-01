import { Express, RequestHandler } from "express";

/**
 *
 *
 *  Map<keyof Express: Methods, Map<string: Route, RequestHandler[]: Middlewares & Function Request>>
 *
 */
export type RouteHandlers = Map<keyof Express, Map<string, RequestHandler[]>>;
