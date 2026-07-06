import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";

export function auth(request: Request, response: Response, next: NextFunction) {
  if (!env.apiKey) {
    return next();
  }

  const token = request.header("x-api-key");
  if (token !== env.apiKey) {
    return response.status(401).json({ message: "Missing or invalid API key" });
  }

  next();
}