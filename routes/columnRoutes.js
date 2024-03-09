import express from "express";
import { verifyToken } from "../midellwares/checkToken.js";
import { checkIsValidId } from "../midellwares/isValidId.js";
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

columnRouter.get("/:boardId", verifyToken, checkIsValidId, getColumns);

columnRouter.post(
  "/",
  verifyToken,
  // validateBody(createColumnSchema),
  createColumn
);

columnRouter.put(
  "/:columnId",
  verifyToken,
  checkIsValidId,
  validateBody(updateColumnSchema),
  updateColumn
);

columnRouter.delete("/:columnId", verifyToken, checkIsValidId, removeColumn);

export default columnRouter;
