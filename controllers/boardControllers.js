import HttpError from "../helpers/HttpError.js";
import { trycatchFunc } from "../helpers/trycatchFunc.js";
import * as bordService from "../services/bordService.js";

export const newBords = trycatchFunc(async (req, res) => {
  const { _id: owner } = req.user;
  const boards = await bordService.allBords(owner);
  res.json(boards); //get all the user's
});

export const deleteBord = trycatchFunc(async (req, res) => {
  const id = req.params.boardId;
  const { _id: owner } = req.user;

  const board = await bordService.deleteBord(owner, id);

  if (!board) {
    throw HttpError(404, `Bord id ${id} deleted! `);
  }
  res.json({ message: "Bord  deleted!" });
});

export const createBord = trycatchFunc(async (req, res) => {
  const { _id: owner } = req.user;

  const newBoard = await bordService.addBord(owner, req.body);

  if (newBoard && newBoard.error) {
    throw HttpError(409, newBoard.error);
  }
  res.json("Succses!").json(newBoard);
});

export const updateBordcontroller = trycatchFunc(async (req, res) => {
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
});
