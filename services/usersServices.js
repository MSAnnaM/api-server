import User from "../db/models/userModel.js";
import { signupToken } from '../helpers/token.js';

export async function userRegistration(data) {
    try {
        const newUser = await User.create(data);
        return newUser;
    }
    catch (error) {
        console.error(error.message)
    }
}

export async function userLogin(data) {
    try {
        const { id } = data
        const token = signupToken(id);
        const result = await User.findByIdAndUpdate(id, { $set: { token } }, { new: true });
        
        return result;
    }
    catch (error) {
        console.error(error.message)
    }
}


export async function getUserByEmail(email) {
    try {
        const user = await User.findOne({email});
        return user;
    }
    catch (error) {
        console.error(error.message)
    }
}

export async function getUserByEmailWithPassword(email) {
    try {
        const user = await User.findOne({email}).select('+password');
        return user;
    }
    catch (error) {
        console.error(error.message)
    }
}