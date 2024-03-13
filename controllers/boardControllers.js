import { BordModel } from "../db/models/BordModel.js";
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
  
  res.json({_id: board.id});
});

export const createBord = trycatchFunc(async (req, res) => {
  const { _id: owner } = req.user;
  const { name } = req.body;
  const existingBoard = await BordModel.findOne({ name }).where("owner").equals(owner);
  
  if (existingBoard) {
    throw HttpError(409, "Board has alredy created");
  }

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
