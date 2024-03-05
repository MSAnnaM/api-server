import HttpError from "../helpers/HttpError";
import * as colomnServices from "../services/columnService";

export const getColumns = async (req, res) => {
  const id = req.params.boardId;
  const { _id: owner } = req.user;

  const column = await colomnServices.getAllColumnByBoard(id, owner);

  res.json(column);
};

export const createColumn = async (req, res) => {
  const id = req.params.boardId;
  const { _id: owner } = req.user;

  const newColumn = await colomnServices.createNewColumn(id, owner, req.body);

  if (newColumn.error) {
    return res.status(409, newColumn.error);
  }
  res.status(201).json(newColumn);
};

export const removeColumn = async (req, res) => {
  const id = req.params.columnId;
  const { _id: owner } = req.user;

  const removedColumn = await colomnServices.deleteColumn(id, owner);

  if (!removedColumn) {
    throw HttpError(404, `Column with id${id} not found`);
  }
  res.json({ message: "Deleted successfully" });
};

export const updateColumn = async (req, res) => {
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
};
