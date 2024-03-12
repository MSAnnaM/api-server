import { BordModel } from "../db/models/BordModel.js";
import { ColumnModel } from "../db/models/columnModel.js";
import { CardModel } from "../db/models/cardModel.js";

export const allBords = (owner) =>
  BordModel.find({ owner }).populate({
    path: "columns",
    populate: {
      path: "cards",
      model: "Card",
    },
  });

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

export const deleteBoardColumns = async (boardId) => {
  return await ColumnModel.deleteMany({ boardId: boardId });
};

export const deleteBoardCards = async (boardId) => {
  return await CardModel.deleteMany({ boardId: boardId });
};

export const deletesBoard = async (id, owner) => {
  return await BordModel.findOneAndDelete({ _id: id, owner });
};
