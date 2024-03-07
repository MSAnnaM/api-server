import express from "express";
import { verifyToken } from "../midellwares/checkToken.js";
// import {
//   checkIsValidBoardId,
//   checkIsValidColumnId,
// } from "../midellwares/isValidId.js";
import { getAllColumnByBoard } from "../services/columnService.js";
import validateBody from "../helpers/validateBody.js";
import {
  createColumnSchema,
  updateColumnSchema,
} from "../schemas/columnSchema.js";
import {
  createColumn,
  getColumns,
  removeColumn,
  updateColumn,
} from "../controllers/columnControllers.js";

const columnRouter = express.Router();

columnRouter.get("/:boardId", verifyToken, getColumns);

// checkIsValidBoardId,

columnRouter.post(
  "/:boardId",
  verifyToken,
  // checkIsValidBoardId,
  validateBody(createColumnSchema),
  createColumn
);

columnRouter.put(
  "/:columnId",
  verifyToken,
  // checkIsValidColumnId,
  validateBody(updateColumnSchema),
  updateColumn
);

columnRouter.delete(
  "/:columnId",
  verifyToken,
  // checkIsValidColumnId,
  removeColumn
);

export default columnRouter;
