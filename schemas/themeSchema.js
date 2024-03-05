import Joi from "joi";

export const updateThemeSchema = Joi.object({
  theme: Joi.string().valid("light", "violet", "dark").required(),
});
