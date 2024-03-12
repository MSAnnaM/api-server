import dotenv from "dotenv";
import * as usersServices from "../services/usersServices.js";

dotenv.config();

import bcrypt from "bcrypt";
import {
  userRegistration,
  userLogin,
  getUserByEmail,
  getUserByEmailWithPassword,
} from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import { trycatchFunc } from "../helpers/trycatchFunc.js";
import { sendMail } from "../services/sendEmail.js";
import User from "../db/models/userModel.js";

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
      token: newUser.token,
      user: {
        name: newUser.name,
        email: newUser.email,
        theme: "dark",
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
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarURL,
        theme: user.theme,
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
    const user = req.user;
    res.json(user);
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
    if (req.file) {
       const file = req.file.path;
    const avatarUrl = await usersServices.updateAvatar(file);
    req.file = avatarUrl;
    }
   
    next();
  } catch (er) {
    console.log(er);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { _id } = req.user;
    let updatedAvatar, updatedInfo, avatarUrl;

    if (req.file) {
      avatarUrl = req.file;
      updatedAvatar = await usersServices.updateProfileInDatabase(_id, {
      avatarUrl,
    });
    }

    if (req.body) {
      const { name, email, password } = req.body;
    updatedInfo = await usersServices.updateProfileInDatabase(_id, {
      name,
      email,
      password,
    });

   
    }
    const updatedUser = { ...updatedAvatar, ...updatedInfo };
    res.json({
      updatedUser,
    });
  } catch (er) {
    console.log(er);
  }
};

export const sendMails = trycatchFunc(async (req, res) => {
  const { email, comment } = req.body;

  const result = await sendMail(email, comment);

  if (result) {
    res.json({ message: "Message was sent successfully!" });
  } else {
    res.status(500).json({ error: "Failed to send message" });
  }
});

export const updateTheme = async (req, res) => {
  const { _id: userId } = req.user;
  const { theme } = req.body;

  const user = await usersServices.updateTheme(userId, theme);
  res.json({ theme: user.theme });
};
