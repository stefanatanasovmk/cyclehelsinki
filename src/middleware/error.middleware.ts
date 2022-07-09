import { Request, Response, NextFunction } from "express";

import HttpError from "../utils/errors/HttpError";

export default function ErrorMiddleware(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  const message =
    error.message || "Ooops...something went kaboom, please try again";
  res.status(status).json({ message });
}
