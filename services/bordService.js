import { BordModel } from "../db/models/BordModel.js";
import HttpError from "../helpers/HttpError.js";
import { trycatchFunc } from "../helpers/trycatchFunc.js";

export const allBords = (owner) => BordModel.find({ owner });

export const addBord = async (owner, data) => {
  const newBord = await BordModel.findOne({ name: data.name });

  if (newBord) {
    return {
      error: "This board already exists",
    };
  }

  const board = await BordModel.create({ ...data, owner });
  return board;
};

export const updateBord = async (boardId, owner, data) => {
  const updatedBord = await BordModel.findByIdAndUpdate(
    {
      _id: boardId,
      owner,
    },
    data,
    { new: true }
  );

  return updatedBord;
};

export const deleteBord = async (owner, boardId) => {
  const deletedBoard = await BordModel.findOneAndDelete({
    _id: boardId,
    owner,
  });

  if (!deletedBoard) {
    throw HttpError(404);
  }
};
