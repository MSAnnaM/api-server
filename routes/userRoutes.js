import express from "express";
import { userRegistrationSchema, userUpdateSubscriptionSchema, verificationEmailSchema } from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";
import {
  userSignup,
  userSignIn,
  userLogout,
  currentUser,
  userUpdateSubscription,
  addAvatar,
  verificationEmail,
  resendEmail
} from "../controllers/usersControllers.js";
import { verifyToken } from "../midellwares/checkToken.js";
import upload from "../midellwares/upload.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(userRegistrationSchema), userSignup);
userRouter.post("/login", validateBody(userRegistrationSchema), userSignIn);
userRouter.post("/logout", verifyToken, userLogout);
userRouter.get("/current", verifyToken, currentUser);
userRouter.patch("/", verifyToken, validateBody(userUpdateSubscriptionSchema), userUpdateSubscription);
userRouter.patch("/avatars", verifyToken, upload.single("avatar"), addAvatar);
userRouter.get("/verify/:verificationToken", verificationEmail);
userRouter.post( "/verify", validateBody(verificationEmailSchema), resendEmail)

export default userRouter;
