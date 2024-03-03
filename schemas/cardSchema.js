import Joi from "joi";

export const cardSchema = Joi.object({
  title: Joi.string().required().label("Title").messages({
    "string.empty": '"Title" cannot be empty',
    "any.required": '"Title" is a required field',
  }),
  description: Joi.string().required().label("Description").messages({
    "string.empty": '"Description" cannot be empty',
    "any.required": '"Description" is a required field',
  }),
  priority: Joi.string()
    .valid("low", "medium", "high")
    .default("medium")
    .label("Priority")
    .messages({
      "any.only": 'Invalid value for "Priority" field',
      "string.base": '"Priority" field must be a string',
    }),
  deadline: Joi.date().required().label("Deadline").messages({
    "any.required": '"Deadline" is a required field',
    "date.base": '"Deadline" field must be a date',
  }),
});

export const updateCardSchema = Joi.object({
  title: Joi.string().label("Title").messages({
    "string.empty": '"Title" cannot be empty',
  }),
  description: Joi.string().label("Description").messages({
    "string.empty": '"Description" cannot be empty',
  }),
  priority: Joi.string()
    .valid("Without priority", "Low", "Medium", "High")
    .default("Low")
    .label("Priority")
    .messages({
      "any.only": 'Invalid value for "Priority" field',
      "string.base": '"Priority" field must be a string',
    }),
  deadline: Joi.date().label("Deadline").messages({
    "date.base": '"Deadline" field must be a date',
  }),
});
