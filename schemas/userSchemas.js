import Joi from "joi";

export const userRegistrationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

export const userUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(255),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(30),
  avatarURL: Joi.string().uri().allow(""),
});
