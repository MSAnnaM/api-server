import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  getUserTheme,
  updateUserTheme,
} from "../controllers/themeControllers.js";
import { isValidThemeId } from "../midellwares/isValidId.js";
import { verifyToken } from "../midellwares/checkToken.js";
import { updateThemeSchema } from "../schemas/themeSchema.js";

const themeRouter = express.Router();

themeRouter.get("/:id", verifyToken, isValidThemeId, getUserTheme);

themeRouter.patch(
  "/:id",
  verifyToken,
  isValidThemeId,
  validateBody(updateThemeSchema),
  updateUserTheme,
);

export default themeRouter;
