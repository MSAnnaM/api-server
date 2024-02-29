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
      required: true,
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
  name: Joi.string().required.max(16),
  email: Joi.email().required(),
  password: Joi.string.required().min(6),
});

const loginUserSchema = Joi.object({
  email: Joi.email().required().max(16),
  password: Joi.string.required().min(6),
});

const updateUserSchema = Joi.object({
  name: Joi.string().max(16),
  email: Joi.email(),
  password: Joi.string().min(6),
  avatarUrl: Joi.string(),
});
const User = model("user", userModel);

export default { User, registerUserSchema, loginUserSchema, updateUserSchema };
