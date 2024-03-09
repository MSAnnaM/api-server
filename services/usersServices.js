import User from "../db/models/userModel.js";
import { signupToken } from "../helpers/token.js";
import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

export async function userRegistration(data) {
  try {
    const newUser = await User.create(data);
    const { _id } = newUser;
    const token = signupToken(_id);
    const result = await User.findByIdAndUpdate(
      newUser,
      { $set: { token } },
      { new: true }
    );
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export async function userLogin(data) {
  try {
    const { _id } = data;
    const token = signupToken(_id);
    const result = await User.findByIdAndUpdate(
      _id,
      { $set: { token } },
      { new: true }
    );

    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getUserByEmailWithPassword(email) {
  try {
    const user = await User.findOne({ email }).select("+password");
    return user;
  } catch (error) {
    console.error(error.message);
  }
}

export const updateAvatar = async (tmpUpload, _id) => {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  const result = await cloudinary.uploader.upload(tmpUpload);
  return result.url;
};

export const updateProfileInDatabase = async (userId, updatedData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    
    return updatedUser || null;
  } catch (err) {
    console.log(err);
  }
};

export const updateTheme = async (userId, theme) => {
  return User.findByIdAndUpdate({ _id: userId }, { theme }, { new: true });
};
