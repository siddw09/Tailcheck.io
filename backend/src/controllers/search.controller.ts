import type { Request, Response } from "express";
import { getSearchHistory } from "../services/tracking.service.js";

export async function getHistory(request: Request, response: Response) {
  const history = await getSearchHistory();
  response.json(history);
}