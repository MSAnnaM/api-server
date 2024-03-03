import Joi from "joi";

export const createBoardSchema = Joi.object({
  name: Joi.string().required().label("Name").messages({
    "string.empty": '"name" cannot be an empty field',
    "any.required": 'missing required fild "name"',
  }),
});

export const updateBoardSchema = Joi.object({
  name: Joi.string().required().label("Name").messages({
    "string.empty": '"Name" cannot be an empty field',
  }),
  background: Joi.string().label("Background").messages({
    "string.base": '"Background" must be a string',
  }),
});
