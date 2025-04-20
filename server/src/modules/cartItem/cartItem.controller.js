// cartItem.controller.js
import cartItemService from "./cartItem.service.js";
import { isValidObjectId } from "mongoose";
import { BaseException } from "../../errors/base.error.js";

export const getAllCartItems = async (req, res, next) => {
  try {
    const items = await cartItemService.getAllCartItems();
    res.send(items);
  } catch (err) {
    next(err);
  }
};

export const getCartItemById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      throw new BaseException("ID notogri", 400);
    }

    const item = await cartItemService.getCartItemById(id);
    res.send(item);
  } catch (err) {
    next(err);
  }
};

export const createCartItem = async (req, res, next) => {
  try {
    const data = req.body;
    const newItem = await cartItemService.createCartItem(data);
    res.status(201).send(newItem);
  } catch (err) {
    next(err);
  }
};

export const updateCartItemById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!isValidObjectId(id)) {
      throw new BaseException("ID notogri", 400);
    }

    const updatedItem = await cartItemService.updateCartItemById(id, data);
    res.send(updatedItem);
  } catch (err) {
    next(err);
  }
};

export const deleteCartItemById = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
      throw new BaseException("ID notogri", 400);
    }

    const deletedItem = await cartItemService.deleteCartItemById(id);
    res.send(deletedItem);
  } catch (err) {
    next(err);
  }
};
