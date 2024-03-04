import { express } from "express";
import { verifyToken } from "../midellwares/checkToken";
import checkIsValidId from "../midellwares/isValidId";
import { getAllColumnByBoard } from "../services/columnService";

columnRouter = express.Router();

columnRouter.get("/:bordId", verifyToken, checkIsValidId, getAllColumnByBoard);
