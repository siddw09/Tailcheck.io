import { Schema, model } from "mongoose";

const searchLogSchema = new Schema(
  {
    hex: { type: String, required: true, trim: true, uppercase: true, length: 6 },
    searchedAt: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false }
  },
  { versionKey: false }
);

export const SearchLogModel = model("SearchLog", searchLogSchema);