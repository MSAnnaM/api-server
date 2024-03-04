import express from "express";
import {
  userRegistrationSchema,
  userUpdateSchema,
  loginUserSchema,
} from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";
import * as userSchema from "../schemas/userSchemas.js";
import * as usersControllers from "../controllers/usersControllers.js";
import {
  userSignup,
  userSignIn,
  userLogout,
  currentUser,
  updateProfile,
} from "../controllers/usersControllers.js";
import { verifyToken } from "../midellwares/checkToken.js";
import upload from "../midellwares/upload.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(userRegistrationSchema), userSignup);
userRouter.post("/login", validateBody(loginUserSchema), userSignIn);
userRouter.post("/logout", verifyToken, userLogout);
userRouter.get("/current", verifyToken, currentUser);

userRouter.put(
  "/update",
  verifyToken,
  upload.single("avatarURL"),
  validateBody(userUpdateSchema),
updateProfile
);
userRouter.post(
  "/help",
  validateBody(userSchema.sendMailSchema),
  usersControllers.sendMails,
);

export default userRouter;
