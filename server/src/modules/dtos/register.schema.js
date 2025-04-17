import Joi from "joi"

export const registerSchema=Joi.object({
    name:Joi.string().min(3).max(55).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(4).max(16).required(),
    image:Joi.string()
})