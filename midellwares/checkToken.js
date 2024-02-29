import HttpError from "../helpers/HttpError.js";
import User from "../db/models/userModel.js";
import { checkAuthToken } from "../helpers/token.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.startsWith("Bearer") &&
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw HttpError(401, "Not authorized");
    }

    const userId = checkAuthToken(token);
    const decodedUser = await User.findById(userId);

    if (!decodedUser || decodedUser.token !== token) {
      throw HttpError(401, "Not authorized");
    }

    req.user = decodedUser;
    next();
  } catch (er) {
    next(er);
  }
};
