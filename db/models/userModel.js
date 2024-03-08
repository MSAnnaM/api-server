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

const User = model("user", userModel);

export default User;
