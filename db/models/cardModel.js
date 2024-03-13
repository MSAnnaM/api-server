import { Schema, model } from "mongoose";

const priorityList = ["Without", "Low", "Medium", "High"];

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
    deadline: {
      type: Date,
      required: true,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Column",
      immutable: false,
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
    index: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

export const CardModel = model("Card", cardModel);
