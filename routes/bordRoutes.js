import  express  from "express";
import {
  createBord,
  deleteBord,
  newBords,
  updateBordcontroller,
} from "../controllers/boardControllers.js";
import { verifyToken } from "../midellwares/checkToken.js";
import validateBody from "../helpers/validateBody.js";
import { createBoardSchema, updateBoardSchema } from "../schemas/boardSchema.js";
import checkIsValidId from "../midellwares/isValidId.js";

const boardRouter = express.Router();

boardRouter.get("/", verifyToken, newBords);

boardRouter.post("/", verifyToken, validateBody(createBoardSchema), createBord);

boardRouter.put(
  "/:bordId",
  verifyToken,
  checkIsValidId,
  validateBody(updateBoardSchema),
  updateBordcontroller
);

boardRouter.delete("/:bordId", verifyToken, checkIsValidId, deleteBord);

export default boardRouter;
