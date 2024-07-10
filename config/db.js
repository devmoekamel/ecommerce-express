import mongoose from "mongoose";

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  console.log("connected to DB", conn.connection.host);
};
