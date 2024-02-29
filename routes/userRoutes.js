import express from "express";
import {
  userRegistrationSchema,
  userUpdateSchema,
  userUpdateSubscriptionSchema,
} from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";
import {
  userSignup,
  userSignIn,
  userLogout,
  currentUser,
  userUpdateSubscription,
  updateUserController,
} from "../controllers/usersControllers.js";
import { verifyToken } from "../midellwares/checkToken.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(userRegistrationSchema), userSignup);
userRouter.post("/login", validateBody(userRegistrationSchema), userSignIn);
userRouter.post("/logout", verifyToken, userLogout);
userRouter.get("/current", verifyToken, currentUser);
userRouter.patch(
  "/",
  verifyToken,
  validateBody(userUpdateSubscriptionSchema),
  userUpdateSubscription
);
userRouter.patch(
  "/updateUser",
  verifyToken,
  validateBody(userUpdateSchema),
  updateUserController
);

export default userRouter;
