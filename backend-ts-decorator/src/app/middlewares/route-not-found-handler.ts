import { Request, Response, NextFunction } from "express";

export const routeNotFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error("Route Not Found");

  res.status(404).json({ error: error.message });
  return;
};
