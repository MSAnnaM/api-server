import { Schema, model } from "mongoose";

const columnSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false }
);

export const ColumnModel = model("Colomn", columnSchema);
