import Joi from "joi";

export const createBoardSchema = Joi.object({
  name: Joi.string().required().label("Name").messages({
    "string.empty": '"name" cannot be an empty field',
    "any.required": 'missing required field "name"',
  }),
  icon: Joi.string().default("four-circles").label("Icon").messages({
    "string.empty": '"Icon" field cannot be empty',
    "any.default": 'Failed to set a default value for "Icon"',
  }),
  background: Joi.object().messages({
    "string.empty": '"Background" field cannot be empty',
  }),
});

export const updateBoardSchema = Joi.object({
  name: Joi.string().required().label("Name").messages({
    "string.empty": '"Name" cannot be an empty field',
  }),
  icon: Joi.string().label("Icon").messages({
    "string.empty": '"Icon" field cannot be empty',
  }),
  background: Joi.object().messages({
    "string.empty": '"Background" field cannot be empty',
  }),
});
