import { CardModel } from "../db/models/cardModel.js";
import { ColumnModel } from "../db/models/columnModel.js";
import HttpError from "../helpers/HttpError.js";

export const getAllColumnByBoard = async (id, owner) => {
  const columns = await ColumnModel.find({ boardId: id, owner });

  if (!columns) {
    throw HttpError(404, "Column not found");
  }
  return columns;
};

export const createNewColumn = async (owner, data) => {
  const { boardId, title } = data;
  const column = await ColumnModel.findOne({ boardId, title });

  if (column) {
    throw HttpError(409, "This column already exists in this board.");
  }
  const newColumn = await ColumnModel.create({ ...data, owner });

  return newColumn;
};

export const updateColumn = async (id, owner, data) => {
  const updatedColumn = await ColumnModel.findOneAndUpdate(
    { _id: id, owner },
    data,
    { new: true }
  );
  return updatedColumn;
};

export const findColumn = async (id, owner) => {
  const column = await ColumnModel.findOne({ _id: id, owner });
  return column;
};

export const deleteCards = async (id) => {
  const deleteCardsResult = await CardModel.deleteMany({ columnId: id });
  return deleteCardsResult;
};

export const deleteColumn = async (id, owner) => {
  const removedColumn = await ColumnModel.findOneAndDelete({ _id: id, owner });
  return removedColumn;
};
