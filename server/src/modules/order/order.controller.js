import orderService from "./order.service.js";
import { BaseException } from "../../errors/base.error.js";
import { isValidObjectId } from "mongoose";
import { createOrderSchema, updateOrderSchema } from "./dtos/orde.schema.js";

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    res.send({
      message: "success",
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new BaseException("ID notogri", 400);
    }

    const order = await orderService.getOrderById(id);
    res.send({
      message: "success",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) {
      throw new BaseException(error.message, 400);
    }
    const { user_id, status, total_price } = req.body;

    const data = {
      user_id,
      status,
      total_price,
    };

    const newOrder = await orderService.createOrder(data);
    res.status(201).send({
      message: "Buyurtma yaratildi",
      data: newOrder,
    });
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { error, value } = updateOrderSchema.validate(req.body);
    if (error) {
      throw new BaseException(error.message, 400);
    }
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new BaseException("ID noto'g'ri", 400);
    }

    const { user_id, status, total_price } = req.body;
    const data = {
      user_id,
      status,
      total_price,
    };

    const updatedOrder = await orderService.updateOrderById(id, data);
    res.send({
      message: "Buyurtma yangilandi",
      data: updatedOrder,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new BaseException("ID noto‘g‘ri", 400);
    }

    const deleted = await orderService.deleteOrderById(id);
    res.send({
      message: "Buyurtma o‘chirildi",
      data: deleted.data,
    });
  } catch (err) {
    next(err);
  }
};
