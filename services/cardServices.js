import { CardModel } from "../db/models/cardModel.js";
import HttpError from "../helpers/HttpError.js";
import { trycatchFunc } from "../helpers/trycatchFunc.js";

export const allCards = trycatchFunc(async (boardId, owner) => {
  const cards = await CardModel.find({ boardId, owner });

  if (!cards) {
    throw HttpError(404, `No card found for the given parameters`);
  }

  return cards;
});

export const newCards = async (owner, data) => {
  const addCard = await CardModel.create({ ...data, owner });

  return addCard;
};

export const updateCard = async (id, owner, data) => {
  const updatedCard = await CardModel.findOneAndUpdate(
    { _id: id, owner },
    data,
    { new: true }
  );

  return updatedCard;
};

export const deleteCard = async (id, owner) => {
  const deletedCard = await CardModel.findOneAndDelete({ _id: id, owner });

  return deletedCard;
};

export const columnUpdateInCard = async (id, owner, { columnId, index }) => {
  const updatedCard = await CardModel.findOneAndUpdate(
    { _id: id, owner },
    { $set: { columnId, index } },
    { new: true }
  );

  return updatedCard;
};
