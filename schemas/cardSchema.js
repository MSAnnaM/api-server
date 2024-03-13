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
    .valid("Without", "Low", "Medium", "High")
    .default("Low")
    .label("Priority")
    .messages({
      "any.only": 'Invalid value for "Priority" field',
      "string.base": '"Priority" field must be a string',
    }),
  deadline: Joi.date().required().label("Deadline").messages({
    "any.required": '"Deadline" is a required field',
    "date.base": '"Deadline" field must be a date',
  }),
  boardId: Joi.string().required().label("Id").messages({
    "string.empty": '"Id" cannot be an empty field',
    "any.required": 'Missing required field "Id"',
  }),
  columnId: Joi.string().required().label("Id").messages({
    "string.empty": '"Id" cannot be an empty field',
    "any.required": 'Missing required field "Id"',
  }),
  index: Joi.number().required().label("Index").messages({
    "string.empty": '"Index" cannot be an empty field',
    "any.required": 'Missing required field "Index"',
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
  columnId: Joi.string().label("Id").messages({
    "string.empty": '"Id" cannot be empty',
  }),
  allColumnId: Joi.string().label("Id").messages({
    "string.empty": '"Id" cannot be empty',
  }),
})

export const updateColumnIdinCardSchema = Joi.object({
  columnId: Joi.string().required().label("Id").messages({
    "string.empty": '"Id" cannot be an empty field',
    "any.required": 'Missing required field "Id"',
  }),
  index: Joi.number().required().label("Index").messages({
    "string.empty": '"Index" cannot be an empty field',
    "any.required": 'Missing required field "Index"',
  }),
});
