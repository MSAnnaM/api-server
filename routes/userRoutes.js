import express from "express";
import {
  userRegistrationSchema,
  userUpdateSchema,
  loginUserSchema,
} from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";
import {
  userSignup,
  userSignIn,
  userLogout,
  currentUser,
  updateProfileController,
  uploadImageController,
} from "../controllers/usersControllers.js";
import { verifyToken } from "../midellwares/checkToken.js";
import upload from "../midellwares/upload.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(userRegistrationSchema), userSignup);
userRouter.post("/login", validateBody(loginUserSchema), userSignIn);
userRouter.post("/logout", verifyToken, userLogout);
userRouter.get("/current", verifyToken, currentUser);
userRouter.post("/upload", upload.single("image"), uploadImageController);
userRouter.patch(
  "/updateUser/:id",
  upload.single("image"),
  validateBody(userUpdateSchema),
  updateProfileController
);

export default userRouter;
