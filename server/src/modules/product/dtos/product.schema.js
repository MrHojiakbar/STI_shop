
import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(64).required(),
  description: Joi.string().min(3).max(500).required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).default(1),
  category_id: Joi.string().required()
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(64),
  description: Joi.string().min(3).max(500),
  price: Joi.number().min(0),
  quantity: Joi.number().min(0),
  category_id: Joi.string()
});
