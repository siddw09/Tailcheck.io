import mongoose from "mongoose";

export async function connectDatabase(uri = process.env.MONGODB_URI) {
  if (!uri) {
    return null;
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(uri);
  return mongoose.connection;
}