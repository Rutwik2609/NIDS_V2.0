import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: [3, "Username must be at least 3 characters long"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password must be at least 6 characters long"],
      // select: false
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
