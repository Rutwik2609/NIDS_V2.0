import User from "../models/user.model.js";
import { hashPassword } from "../lib/hashPassword.js";
import { comparePassword } from "../lib/comparePassword.js";
import { generateTokenAndSetCookie } from "../lib/generateToken.js";

export const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hash = await hashPassword(password);

    const user = new User({ username, password: hash, email });

    await generateTokenAndSetCookie(user._id, res);

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await comparePassword(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = await generateTokenAndSetCookie(user._id, res);

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("Error in loginUser Controller", error.message);

    res.status(400).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logoutUser Controller", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
