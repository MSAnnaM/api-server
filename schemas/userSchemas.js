import Joi from "joi";

export const userRegistrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

export const verificationEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Missing required email field",
  }),
});

export const userUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(20),
  avatarUrl: Joi.string().uri(),
});
