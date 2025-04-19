import OrderItem from "./orderItem.model.js";
import { BaseException } from "../../errors/base.error.js";
import { isValidObjectId } from "mongoose";

class OrderItemService {
  async getAllOrderItems() {
    const items = await OrderItem.find().populate("order_id").populate("product_id");
    return items;
  }

  async getOrderItemById(id) {
    if (!isValidObjectId(id)) {
      throw new BaseException("Notogri ID", 400);
    }
    const item = await OrderItem.findById(id).populate("order_id").populate("product_id");
    if (!item) {
      throw new BaseException("Order item topilmadi", 404);
    }
    return item;
  }

  async createOrderItem(data) {
    const created = await OrderItem.create(data);
    return created;
  }

  async updateOrderItem(id, data) {
    if (!isValidObjectId(id)) {
      throw new BaseException("Notogri ID", 400);
    }
    const updated = await OrderItem.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!updated) {
      throw new BaseException("Order item topilmadi", 404);
    }
    return updated;
  }

  async deleteOrderItem(id) {
    if (!isValidObjectId(id)) {
      throw new BaseException("Notogri ID", 400);
    }
    const deleted = await OrderItem.findByIdAndDelete(id);
    if (!deleted) {
      throw new BaseException("Order item topilmadi", 404);
    }
    return {
      message: "Order item muvaffaqiyatli ochirildi",
      data: deleted
    };
  }
}

export default new OrderItemService();
