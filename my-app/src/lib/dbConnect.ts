import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ MongoDB URI is missing in environment variables");
}

export const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("🚀 Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw new Error("Database connection failed");
  }
};
