import express from "express";
import { verifyToken } from "../midellwares/checkToken.js";
import { checkIsValidId } from "../midellwares/isValidId.js";
import validateBody from "../helpers/validateBody.js";
import {
  cardSchema,
  updateCardSchema,
  updateColumnIdinCardSchema,
} from "../schemas/cardSchema.js";
import {
  createCard,
  getters,
  removeCard,
  updateCardController,
  updateColumnIdinCard,
} from "../controllers/cardControllers.js";

const cardRouter = express.Router();

cardRouter.get("/", verifyToken, checkIsValidId, getters);

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
cardRouter.patch(
  "/:cardId",
  verifyToken,
  checkIsValidId,
  validateBody(updateColumnIdinCardSchema),
  updateColumnIdinCard
);

cardRouter.delete("/:cardId", verifyToken, checkIsValidId, removeCard);

export default cardRouter;
