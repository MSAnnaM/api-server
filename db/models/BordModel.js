import { Schema, model } from "mongoose";
import mongooseAutopopulate from "mongoose-autopopulate";

const iconList = [
  "icon-project",
  "icon-star",
  "icon-loading",
  "icon-puzzle",
  "icon-container",
  "icon-lightning",
  "icon-colors",
  "icon-hexagon",
];

const bordSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "icon-hexagon",
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
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: "Colomn",
        autopopulate: true,
      },
    ],
  },
  { versionKey: false }
);

bordSchema.plugin(mongooseAutopopulate);

export const BordModel = model("Bord", bordSchema);
