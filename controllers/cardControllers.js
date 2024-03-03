import * as cardServices from "../services/cardServices";

export const getters = async (req, res) => {
  const { _id: owner } = req.user;

  const cards = await cardServices.allCards(owner);

  res.json(cards);
};

export const createCard = async (req, res) => {
  const id = req.params.columnId;
  const { _id: owner } = req.user;
  const { body } = req;

  const newCard = await cardServices.newCards(id, owner, body);

  res.status(201).json(newCard);
};
