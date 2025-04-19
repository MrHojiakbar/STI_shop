import { createOrderItemSchema, updateOrderItemSchema } from "./dtos/orderItem.schema.js";
import orderItemService from "./orderItem.service.js";

export const getAllOrderItems = async (req, res, next) => {
  try {
    const items = await orderItemService.getAllOrderItems();
    res.send(items);
  } catch (err) {
    next(err);
  }
};

export const getOrderItemById = async (req, res, next) => {
  try {
    const item = await orderItemService.getOrderItemById(req.params.id);
    res.send(item);
  } catch (err) {
    next(err);
  }
};

export const createOrderItem = async (req, res, next) => {
  try {
    const { error, value } = createOrderItemSchema.validate(req.body);
    if (error) {
      throw new BaseException(error.message, 400);
    }
    const item = await orderItemService.createOrderItem(req.body);
    res.status(201).send(item);
  } catch (err) {
    next(err);
  }
};

export const updateOrderItem = async (req, res, next) => {
  try {
    const { error, value } = updateOrderItemSchema.validate(req.body);
    if (error) {
      throw new BaseException(error.message, 400);
    }
    const item = await orderItemService.updateOrderItem(req.params.id, req.body);
    res.send(item);
  } catch (err) {
    next(err);
  }
};

export const deleteOrderItem = async (req, res, next) => {
  try {
    const result = await orderItemService.deleteOrderItem(req.params.id);
    res.send(result);
  } catch (err) {
    next(err);
  }
};
