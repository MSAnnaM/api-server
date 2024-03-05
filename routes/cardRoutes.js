import  express  from "express";
import { verifyToken } from "../midellwares/checkToken.js";
import checkIsValidId from "../midellwares/isValidId.js";
import validateBody from "../helpers/validateBody.js";
import { cardSchema, updateCardSchema } from "../schemas/cardSchema.js";
import {
  createCard,
  getters,
  removeCard,
  updateCardController,
} from "../controllers/cardControllers.js";

const cardRouter = express.Router();

cardRouter.get("/", verifyToken, getters);

cardRouter.post(
  "/:columnId",
  verifyToken,
  checkIsValidId,
  validateBody(cardSchema),
  createCard
);

cardRouter.put(
  "/:cardId",
  verifyToken,
  checkIsValidId,
  validateBody(updateCardSchema),
  updateCardController
);

cardRouter.delete("/:cardId", verifyToken, checkIsValidId, removeCard);

export default cardRouter;