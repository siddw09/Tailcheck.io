import type { NextFunction, Request, Response } from "express";
import { searchRequestSchema } from "@tailcheck/shared";

export function validateSearch(request: Request, response: Response, next: NextFunction) {
  const result = searchRequestSchema.safeParse(request.params);
  if (!result.success) {
    return response.status(400).json({ message: "Invalid aircraft hex" });
  }

  next();
}