import Joi from "joi";

export const createColumnSchema = Joi.object({
  title: Joi.string().required().label("Title").messages({
    "string.empty": '"Title" cannot be an empty field',
    "any.required": 'Missing required field "Title"',
  }),
});

export const updateColumnSchema = Joi.object({
  title: Joi.string().label("Title").messages({
    "string.empty": '"Title" cannot be an empty field',
  }),
});
