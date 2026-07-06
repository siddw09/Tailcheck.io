import type { Request, Response } from "express";
import { getTrackingSnapshot } from "../services/tracking.service.js";

export async function getTrackingByHex(request: Request, response: Response) {
  const hex = String(request.params.hex ?? "").toUpperCase();
  const snapshot = await getTrackingSnapshot(hex);
  response.json(snapshot);
}