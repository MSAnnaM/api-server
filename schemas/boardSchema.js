import Joi from "joi";

export const createBoardSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": '"name" cannot be an empty field',
    "any.required": 'missing required fild "name"',
  }),
  background: Joi.string().messages({
    "string.base": '"Background" must be a string',
  }),
  icon: Joi.string().messages({
    "string.base": '"Icon" must be a string',
  }),
});

export const updateBoardSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": '"Name" cannot be an empty field',
  }),
  background: Joi.string().messages({
    "string.base": '"Background" must be a string',
  }),
});
