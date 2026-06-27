import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
