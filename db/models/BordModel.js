import { Schema, model } from "mongoose";

const bordSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      default: "default.jpg",
    },
    icon: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false }
);

export const BordModel = model("Bord", bordSchema);
