import validator from "validator";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { token } from "morgan";
const generateToken = (id, type) => {
  return jwt.sign({ id, type }, process.env.JWT_SECRECT_Key, {
    expiresIn: "30d",
  });
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Please provide email & password",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid email",
    });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      success: false,
      error: "Please provide a strong password",
    });
  }

  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new User({
      email,
      password: hashedPassword,
    }).save();

    const token = generateToken(newUser._id, newUser.type);

    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "please provide email & password",
    });
  }
  try {
    const existuser = await User.findOne({ email });
    if (!existuser) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials",
      });
    }
    const Token = generateToken(existuser._id, existuser.type);
    res.status(200).json({
      success: true,
      token: Token,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};
