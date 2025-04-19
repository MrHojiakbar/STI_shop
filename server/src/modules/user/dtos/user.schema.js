import Joi from "joi";

export const updateUserSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(50).required(),
  balance: Joi.number().min(0).optional(),
  income: Joi.number().min(0).optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(16).required(),
});

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(55).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(16).required(),
  image: Joi.string(),
});
