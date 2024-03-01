import express from "express";
import {
  userRegistrationSchema,
  userUpdateSchema,
  loginUserSchema,
  updateUserSchema,
} from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";
import {
  userSignup,
  userSignIn,
  userLogout,
  currentUser,
  updateUserController,
} from "../controllers/usersControllers.js";
import { verifyToken } from "../midellwares/checkToken.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(userRegistrationSchema), userSignup);
userRouter.post("/login", validateBody(loginUserSchema), userSignIn);
userRouter.post("/logout", verifyToken, userLogout);
userRouter.get("/current", verifyToken, currentUser);
userRouter.patch(
  "/updateUser",
  verifyToken,
  validateBody(userUpdateSchema),
  updateUserController
);

export default userRouter;
