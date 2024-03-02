import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/userRoutes.js";
import { errorHandler, notFoundHandler } from "./helpers/errorHandlers.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/users", userRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
