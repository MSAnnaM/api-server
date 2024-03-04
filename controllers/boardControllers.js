import HttpError from "../helpers/HttpError";
import * as bordService from "../services/bordService";

export const newBords = async (req, res) => {
  const { _id: owner } = req.user;
  const boards = await bordService.allBords(owner);
  res.json(boards); //get all the user's
};

export const deleteBord = async (req, res) => {
  const id = req.params.boardId;
  const { _id: owner } = req.user;

  const board = await bordService.deleteBord(owner, id);

  if (!board) {
    throw HttpError(404, `Bord id ${id} not found`);
  }
  res.json({ message: "Bord  deleted!" });
};

export const createBord = async (req, res) => {
  const { _id: owner } = req.user;

  const newBoard = await bordService.addBord(owner, req.body);

  if (newBoard.error) {
    throw HttpError(409, newBoard.error);
  }
  res.status(201).json(newBoard);
};

export const updateBordcontroller = async (req, res) => {
  const id = req.params.boardId;
  const { body } = req;
  const { _id: owner } = req.user;

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "missing field");
  }

  const updatedBord = await bordService.updateBord(id, owner, body);

  if (!updatedBord) {
    throw HttpError(404, `Board id${id} not found`);
  }
  res.json(updatedBord);
};
