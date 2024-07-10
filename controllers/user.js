import validator from "validator";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { token } from "morgan";
const generateToken = (id,type) => {
  return jwt.sign({ id, type}, process.env.JWT_SECRECT_Key, {
    expiresIn: "30d",
  });
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "please provide email & password",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      email: "please provide a valid email",
    });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      success: false,
      email: "please provide a Strong Password",
    });
  }
  try {
    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.status(400).json({
        success: false,
        error: "user already exist",
      });
    }
    const salt = bcrypt.genSalt(10);
    const hashedpassword = bcrypt.hash(password, salt);
    const newuser = await new User({
      email,
      hashedpassword,
    }).save();
    const token = generateToken(existuser._id,existuser.type);

    res.status(200).json({
      success: true,
      Token: token,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
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
 try{
    const existuser =  await  User.findOne({email});
    if(!existuser){
        return res.status(400).json({
            success:false,
            error:"Invalid credentials"
        })
    }
    const Token = generateToken(existuser._id,existuser.type);
    res.status(200).json({
        success:true,
        token:Token
    });  

    }catch(e){
        res.status(400).json({
            success:false,
            error:e
        })
    }
};
