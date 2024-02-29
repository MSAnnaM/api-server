import { Schema, model } from "mongoose";
import Joi from "joi";

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
    },
    avatarUrl: {
      type: String,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string.required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string.required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  avatarUrl: Joi.string(),
});
const User = model("user", userModel);

export default { User, registerUserSchema, loginUserSchema };
