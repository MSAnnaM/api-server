import { express } from "express";
import { verifyToken } from "../midellwares/checkToken";
import checkIsValidId from "../midellwares/isValidId";
import validateBody from "../helpers/validateBody";
import { cardSchema, updateCardSchema } from "../schemas/cardSchema";
import { createCard, getters } from "../controllers/cardControllers";

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
  validateBody(updateCardSchema)
);

cardRouter.delete("/:cardId", verifyToken, checkIsValidId);
