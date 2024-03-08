import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError";

export const checkIsValidId = (req, _, next) => {
  const { boardId, columnId, cardId } = req.params;

  const id = boardId || columnId || cardId;

  if (!isValidObjectId(id)) {
    next(HttpError(400, `Requested id(${id}) is invalid`));
    return;
  }

  next();
};
