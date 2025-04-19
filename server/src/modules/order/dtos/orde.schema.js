import Joi from "joi";

export const createOrderSchema = Joi.object({
  user_id: Joi.string().required(), 
  status: Joi.string().valid("PENDING", "SUCCES", "CANCELED").default("PENDING"),
  total_price: Joi.number().min(0).required(), // total_price musbat son bo'lishi kerak
});

export const updateOrderSchema = Joi.object({
  user_id: Joi.string().required(), 
  status: Joi.string().valid("PENDING", "SUCCES", "CANCELED").optional(), 
  total_price: Joi.number().min(0).optional(), 
});
