import { CardModel } from "../db/models/cardModel.js";
import HttpError from "../helpers/HttpError.js";
import { trycatchFunc } from "../helpers/trycatchFunc.js";

export const allCards = trycatchFunc(async (owner) => {
  const cards = await CardModel.find({ owner });

  if (!cards) {
    throw HttpError(404, "No Cards Found");
  }
  return cards;
});

export const newCards = async (columnId, owner, data) => {
  const addCard = await CardModel.create({ ...data, owner, columnId });
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

export const columnUpdateInCard = async (id, owner, { columnId }) => {
  const updatedCard = await CardModel.findOneAndUpdate(
    { _id: id, owner },
    { $set: { columnId } },
    { new: true }
  );
};
