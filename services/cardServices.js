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
