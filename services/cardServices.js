import { CardModel } from "../db/models/cardModel";
import HttpError from "../helpers/HttpError";

export const allCards = async (owner) => {
  const cards = await CardModel.find({ owner });

  if (!cards) {
    throw HttpError(404, "No Cards Found");
  }
  return cards;
};

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
