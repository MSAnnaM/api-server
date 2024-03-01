import Joi from "joi";

export const userRegistrationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().max(16),
  password: Joi.string().required().min(6),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().max(16),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  avatarUrl: Joi.string(),
});
