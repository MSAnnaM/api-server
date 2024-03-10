import pkg from 'joi';
const { object } = pkg;
import { Schema, model } from "mongoose";

const iconList = [
  'icon-project',
  'icon-star',
  'icon-loading',
  'icon-puzzle',
  'icon-container',
  'icon-lightning',
  'icon-colors',
  'icon-hexagon',
];

const bordSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'icon-hexagon',
      enum: iconList,
    },
    background: {
      type: String,
      default: null,
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
