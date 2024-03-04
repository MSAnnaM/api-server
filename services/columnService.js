import { ColumnModel } from "../db/models/columnModel";
import HttpError from "../helpers/HttpError";

export const getAllColumnByBoard = async (id, owner) => {
  const columns = await ColumnModel.find({ boardId: id, owner });

  if (!columns) {
    throw HttpError(404, "Column not found");
  }
  return columns;
};
