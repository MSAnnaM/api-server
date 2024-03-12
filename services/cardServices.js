import { CardModel } from "../db/models/cardModel.js";
import HttpError from "../helpers/HttpError.js";

export const allCards = async (columnId, owner) => {
  const allCardsforUser = await CardModel.find({ owner }).where("columnId")
      .equals(columnId);

  if (!allCardsforUser) {
    throw HttpError(404, `No card found for the given parameters`);
  }
  return allCardsforUser;
};

export const newCards = async (owner, data) => {
  const addCard = await CardModel.create({ ...data, owner });

  return addCard;
};

export const updateCard = async (_id, owner, data) => {
  const updatedCard = await CardModel.findOneAndUpdate(
    { _id, owner },
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
