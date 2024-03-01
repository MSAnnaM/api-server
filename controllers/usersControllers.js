import dotenv from "dotenv";
import cloudinary from "../helpers/cloudinaryConfig.js";

dotenv.config();

import bcrypt from "bcrypt";
import {
  userRegistration,
  userLogin,
  getUserByEmail,
  getUserByEmailWithPassword,
} from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import User from "../db/models/userModel.js";
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";

export const userSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = await userRegistration(user);

    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (er) {
    next(er);
  }
};

export const userSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await getUserByEmailWithPassword(email);

    if (!existingUser) {
      throw HttpError(401, "Email or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw HttpError(401, "Email or password is wrong");
    }

    const user = await userLogin(existingUser);
    user.password = undefined;
    res.json({
      token: user.token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (er) {
    next(er);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    user.token = "";
    await user.save();

    res.status(204).end();
  } catch (er) {
    next(er);
  }
};

export const currentUser = async (req, res) => {
  try {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  } catch (er) {
    console.error(er);
  }
};

export const userUpdateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { id } = req.user;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { subscription },
      { new: true }
    );

    res.json(updateUser);
  } catch (er) {
    console.error(er);
  }
};

export const addAvatar = async (req, res, next) => {
  try {
    const avatarsDir = path.resolve("public", "avatars");
    const { id } = req.user;

    if (!req.file) {
      throw HttpError(400, "No image...Upload file");
    }

    const { path: tempUpload, originalname } = req.file;
    const fileName = `${id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", fileName);

    const image = await Jimp.read(resultUpload);
    await image.resize(250, 250).writeAsync(resultUpload);

    await User.findByIdAndUpdate(id, { avatarURL });

    res.json({ avatarURL });
  } catch (er) {
    next(er);
  }
};

export const updateUserController = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;

  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.avatarURL = result.secure_url;
    }
    const updatedUser = await updateUserService(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update user profile." });
  }
};
