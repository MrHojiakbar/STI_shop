import Joi from "joi";

export const createOrderItemSchema = Joi.object({
  order_id: Joi.string().required(),
  product_id: Joi.string().required(),
  quantity: Joi.number().min(1).default(1),
  price: Joi.number().min(0).default(0),
});

export const updateOrderItemSchema = Joi.object({
  order_id: Joi.string().optional(),
  product_id: Joi.string().optional(),
  quantity: Joi.number().min(1).optional(),
  price: Joi.number().min(0).optional(),
});
