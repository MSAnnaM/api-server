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

  await bordService.deleteBoardColumns(id);

  await bordService.deleteBoardCards(id);

  const deletedBoard = await bordService.deletesBoard(id, owner);

  if (!deletedBoard) {
    throw HttpError(404, "Board not found");
  }

  res.json({
    _id: deletedBoard.id,
    message:
      "The board and all its associated columns and cards have been deleted.",
  });
});

export const createBord = trycatchFunc(async (req, res) => {
  const { _id: owner } = req.user;

  const newBoard = await bordService.addBord(owner, req.body);

  res.json(newBoard);
});

export const updateBordcontroller = trycatchFunc(async (req, res) => {
  const _id = req.params.boardId;
  console.log(_id);
  const { body } = req;
  const { _id: owner } = req.user;

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "missing field");
  }

  const updatedBord = await bordService.updateBord(_id, owner, body);

  if (!updatedBord) {
    throw HttpError(404, `Board with id ${_id} changes accepted`);
  }
  res.json(updatedBord);
});
