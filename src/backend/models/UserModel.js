import mongoose from "mongoose";
import { emailRegex } from "../../utils/regex";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    minlength: 3,
    maxlength: 50,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [emailRegex, "Please enter a valid email"],
    message: "Please enter a valid email address",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 3,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profileUrl: String,

  forgotPasswordToken: Number,
  forgotPasswordTokenExpiry: Date,
  verifyToken: Number,
  verifyTokenExpiry: Date,
});

const UserModel =
  mongoose?.models?.users || mongoose?.model("users", userSchema);

export default UserModel;
