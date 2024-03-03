import Joi from "joi";

const emailRegex = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

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

export const sendMailSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegex).messages({
    "string.pattern.base": "Incorrect email format",
    "string.empty": '"email" cannot be an empty field',
    "any.required": 'missing required field "email"',
  }),
  comment: Joi.string().messages({
    "string.empty": '"comment" cannot be an empty field',
    "any.required": 'missing required field "email"',
  }),
});
