import HttpError from "../helpers/HttpError.js";
import { trycatchFunc } from "../helpers/trycatchFunc.js";
import * as colomnServices from "../services/columnService.js";

export const getColumns = trycatchFunc(async (req, res) => {
  const id = req.params.boardId;
  const { _id: owner } = req.user;

  const column = await colomnServices.getAllColumnByBoard(id, owner);

  res.json(column);
});

export const createColumn = trycatchFunc(async (req, res) => {
  const { _id: owner } = req.user;
  const { boardId, title } = req.body;

  const newColumn = await colomnServices.createNewColumn(owner, req.body);

  if (newColumn.error) {
    return res.status(409, newColumn.error);
  }
  res.status(201).json(newColumn);
});

export const removeColumn = trycatchFunc(async (req, res) => {
  const id = req.params.columnId;
  const { _id: owner } = req.user;

  const removedColumn = await colomnServices.deleteColumn(id, owner);

  if (!removedColumn) {
    throw HttpError(404, `Column with id${id} not found`);
  }
  res.json({ id, message: "Deleted successfully" });
});

export const updateColumn = trycatchFunc(async (req, res) => {
  const id = req.params.columnId;
  const { body } = req;
  const { _id: owner } = req.user;

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "Invalid request");
  }

  const updatedColumn = await colomnServices.updateColumn(id, owner, body);

  if (!updatedColumn) {
    throw HttpError(404, `Column with id ${id} not found.`);
  }
  res.json(updatedColumn);
});
