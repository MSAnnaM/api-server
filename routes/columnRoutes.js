import { express } from "express";
import { verifyToken } from "../midellwares/checkToken";
import checkIsValidId from "../midellwares/isValidId";
import { getAllColumnByBoard } from "../services/columnService";
import validateBody from "../helpers/validateBody";
import {
  createColumnSchema,
  updateColumnSchema,
} from "../schemas/columnSchema";
import {
  createColumn,
  removeColumn,
  updateColumn,
} from "../controllers/columnControllers";

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
