import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import {
  userRegistration,
  userLogin,
  getUserByEmail,
  getUserByEmailWithPassword,
} from "../services/usersServices.js";
import { sendEmail } from "../services/email.js";
import HttpError from "../helpers/HttpError.js";
import User from "../db/models/userModel.js";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import Jimp from "jimp";

const { BASE_URL } = process.env;

export const userSignup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const user = {
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    };
    const newUser = await userRegistration(user);

    const verifyEmail = {
      to: email,
      subject: "Verify your email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}" >Click here to verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
      user: {
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

    if (!existingUser.verify) {
      throw HttpError(401, "Email not verified");
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

export const verificationEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken: verificationToken });

    if (!user) {
      throw HttpError(404, "User not found");
    }

    await User.findByIdAndUpdate(user.id, {
      verify: true,
      verificationToken: null,
    });

    res.json({
      message: "Verification successful",
    });
  } catch (er) {
    next(er);
  }
};

export const resendEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (user.verify) {
      throw HttpError(400, "This account has already been verified.");
    }

    const verifyEmail = {
      to: email,
      subject: "Verify your email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}" >Click here to verify email</a>`,
    };

    await sendEmail(verifyEmail);

    return res.json({ message: "Verification email sent" });
  } catch (er) {
    next(er);
  }
};
