import HttpError from "../helpers/HttpError.js";
import { trycatchFunc } from "../helpers/trycatchFunc.js";
import * as cardServices from "../services/cardServices.js";

export const getters = trycatchFunc(async (req, res) => {
  const { _id: owner } = req.user;
  const id = req.params.columnId;

  const gettersCards = await cardServices.allCards(id, owner);

  res.json(gettersCards);
});

export const createCard = trycatchFunc(async (req, res) => {
  const { _id: owner } = req.user;
  const { body } = req;

  const newCard = await cardServices.newCards(owner, body);

  res.status(201).json(newCard);
});

export const removeCard = trycatchFunc(async (req, res) => {
  const id = req.params.cardId;
  const { _id: owner } = req.user;

  const card = await cardServices.deleteCard(id, owner);

  if (!card) {
    throw HttpError(404, `Card  with the ID ${id} not found.`);
  }
  res.json(card);
});

export const updateCardController = trycatchFunc(async (req, res) => {
  const id = req.params.cardId;
  const { body } = req;
  const { _id: owner } = req.user;

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "missing field");
  }
  const updatedCard = await cardServices.updateCard(id, owner, body);

  if (!updatedCard) {
    throw HttpError(404, `Card with id ${id} not found`);
  }
  res.json(updatedCard);
});

export const updateColumnIdinCard = trycatchFunc(async (req, res) => {
  const id = req.params.cardId;
  const { body } = req;
  const { _id: owner } = req.user;

  const updateCards = await cardServices.columnUpdateInCard(id, owner, body);

  if (!updateCards) {
    throw HttpError(404, "Card ${id} does not exist or column is empty");
  }
  console.log(updateCards);
  res.json(updateCards);
});
