import { Schema, model } from "mongoose";

const cardModel = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Without priority", "Low", "Medium", "High"],
      default: "Low",
    },
    deadline: {
      type: Date,
      required: true,
    },
    colomnId: {
      type: Schema.Types.ObjectId,
      ref: "Colomn",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false }
);

export const CardModel = model("Card", cardModel);
