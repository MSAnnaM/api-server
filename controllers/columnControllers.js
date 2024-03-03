import * as colomnServices from "../services/columnService";

export const getColumns = async (req, res) => {
  const id = req.params.boardId;
  const { _id: owner } = req.user;

  const column = await colomnServices.getAllColumnByBoard(id, owner);

  res.json(column);
};
