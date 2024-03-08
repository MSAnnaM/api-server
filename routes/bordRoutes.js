import { express } from "express";
import {
  createBord,
  deleteBord,
  newBords,
  updateBordcontroller,
} from "../controllers/boardControllers";
import { verifyToken } from "../midellwares/checkToken";
import validateBody from "../helpers/validateBody";
import { createBoardSchema, updateBoardSchema } from "../schemas/boardSchema";
import { checkIsValidId } from "../midellwares/isValidId.js";

const boardRouter = express.Router();

boardRouter.get("/", verifyToken, newBords);

boardRouter.post("/", verifyToken, validateBody(createBoardSchema), createBord);

boardRouter.put(
  "/:boardId",
  verifyToken,
  checkIsValidId,
  validateBody(updateBoardSchema),
  updateBordcontroller
);

boardRouter.delete("/:boardId", verifyToken, checkIsValidId, deleteBord);

export default boardRouter;
