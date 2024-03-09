import { ColumnModel } from "../db/models/columnModel.js";
import HttpError from "../helpers/HttpError.js";
import { trycatchFunc } from "../helpers/trycatchFunc.js";

export const getAllColumnByBoard = async (id, owner) => {
  const columns = await ColumnModel.find({ boardId: id, owner });

  if (!columns) {
    throw HttpError(404, "Column not found");
  }
  return columns;
};

export const createNewColumn = async (boardId, owner, data) => {
  const column = await ColumnModel.findOne({ boardId, title: data.title });

  if (column) {
    throw HttpError(409, "This column already exists in this board.");
  }
  const newColumn = await ColumnModel.create({ ...data, owner, boardId });

  return newColumn;
};

export const deleteColumn = async (id, owner) => {
  const removeColumn = await ColumnModel.findOneAndDelete({
    _id: id,
    owner,
  });
  return removeColumn;
};

export const updateColumn = async (id, owner, data) => {
  const updatedColumn = await ColumnModel.findOneAndUpdate(
    { _id: id, owner },
    data,
    { new: true }
  );
  return updatedColumn;
};
