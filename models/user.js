import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
  type: {
    type: "String",
    default: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);
