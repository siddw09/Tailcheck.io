import { z } from "zod";

export const hexSchema = z
  .string()
  .trim()
  .length(6)
  .regex(/^[0-9A-Fa-f]{6}$/, "ICAO hex must contain exactly 6 hexadecimal characters");

export const searchRequestSchema = z.object({
  hex: hexSchema
});

export const searchLogSchema = z.object({
  hex: hexSchema,
  searchedAt: z.string(),
  resolved: z.boolean()
});