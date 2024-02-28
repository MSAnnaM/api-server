import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

const checkIsValidId = (req, res, next) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        next(HttpError(400, "Id is not valid"));
    }
    next();
}


export default checkIsValidId;