import { Schema, model } from "mongoose";

const aircraftCacheSchema = new Schema(
  {
    hex: { type: String, required: true, unique: true, trim: true, uppercase: true, length: 6 },
    payload: { type: Schema.Types.Mixed, required: true },
    expiresAt: { type: Date, required: true }
  },
  { versionKey: false }
);

export const AircraftCacheModel = model("AircraftCache", aircraftCacheSchema);