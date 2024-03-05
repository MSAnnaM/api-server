import { Schema, model } from "mongoose";
import Joi from "joi";

const themeList = ["light", "violet", "dark"];

const userModel = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      enum: themeList,
      default: "dark",
    },
    avatarUrl: {
      type: String,
    },
    theme: {
      type: String,
      enum: ["light", "dark", "blue"],
      default: "dark",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false },
);

const registerUserSchema = Joi.object({
  name: Joi.string().required().max(16),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  theme: Joi.string(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required().max(16),
  password: Joi.string().required().min(8),
});

const updateUserSchema = Joi.object({
  name: Joi.string().max(16),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  avatarUrl: Joi.string(),
});

const User = model("user", userModel);

export default User;
