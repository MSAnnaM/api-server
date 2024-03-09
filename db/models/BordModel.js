import { Schema, model } from "mongoose";

const iconList = [
  "four-circles",
  "eye",
  "star",
  "loading",
  "puzzle",
  "container",
  "logo",
  "hexagon",
];

const bordSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "four-circles",
      enum: iconList,
    },
    background: {
      type: String,
      default: "1",
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
