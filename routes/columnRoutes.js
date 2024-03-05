import  express  from "express";
import { verifyToken } from "../midellwares/checkToken.js";
import checkIsValidId from "../midellwares/isValidId.js";
import { getAllColumnByBoard } from "../services/columnService.js";
import validateBody from "../helpers/validateBody.js";
import {
  createColumnSchema,
  updateColumnSchema,
} from "../schemas/columnSchema.js";
import {
  createColumn,
  removeColumn,
  updateColumn,
} from "../controllers/columnControllers.js";

columnRouter = express.Router();

columnRouter.get("/:bordId", verifyToken, checkIsValidId, getAllColumnByBoard);

columnRouter.post(
  "/:boardId",
  verifyToken,
  checkIsValidId,
  validateBody(createColumnSchema),
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
