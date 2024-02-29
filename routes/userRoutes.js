import express from "express";

const userRouter = express.Router();

userRouter.post("/register");
userRouter.post("/login");
userRouter.post("/logout");
userRouter.get("/current");
userRouter.patch("/");
userRouter.patch("/avatars");
userRouter.get("/verify/:verificationToken");
userRouter.post("/verify");

export default userRouter;
