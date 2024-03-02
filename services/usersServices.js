import User from "../db/models/userModel.js";
import { signupToken } from "../helpers/token.js";

export async function userRegistration(data) {
  try {
    const newUser = await User.create(data);
    const { id } = newUser;
    const token = signupToken(id);
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
    const { id } = data;
    const token = signupToken(id);
    const result = await User.findByIdAndUpdate(
      id,
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
export const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.secure_url;
  } catch (error) {
    console.error("error in Cloudinary:", error);
    throw new Error("Помилка завантаження зображення");
  }
};

export const updateProfileInDatabase = async (id, updatedData) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    user.name = updatedData.name;
    user.email = updatedData.email;

    if (updatedData.newPassword) {
      const isCurrentPasswordValid = await bcrypt.compare(
        updatedData.currentPassword,
        user.password
      );

      if (!isCurrentPasswordValid) {
        throw new Error("Current password is incorrect");
      }

      const hashedNewPassword = await bcrypt.hash(updatedData.newPassword, 10);
      user.password = hashedNewPassword;
    }

    user.avatarURL = updatedData.avatarURL;

    const updatedUser = await user.save();

    return updatedUser;
  } catch (error) {
    throw error;
  }
};
