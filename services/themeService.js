import HttpError from "../helpers/HttpError.js";
import UserModel from "../db/models/userModel.js";

export const getAllThemesDB = async (idOwner) => {
  const user = await UserModel.findById(idOwner);

  if (!user) {
    throw HttpError(409, "User not found");
  }
  return user;
};

export const updateThemeDB = async (idOwner, theme) => {
  const updateTheme = await UserModel.findOneAndUpdate(
    idOwner,
    { theme },
    { new: true },
  );
  return updateTheme;
};
