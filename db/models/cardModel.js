import { Schema, model } from "mongoose";

const priorityList = ["Without priority", "Low", "Medium", "High"];

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
      enum: priorityList,
      default: "Low",
    },
    columnId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Column",
    },
    boardId: {
      type: Schema.Types.ObjectId,
      reqiured: true,
      ref: "Board",
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { versionKey: false }
);

export const CardModel = model("Card", cardModel);
