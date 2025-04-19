// order.service.js
import Order from "./order.model.js";
import { BaseException } from "../../errors/base.error.js";

class OrderService {
  constructor() {
    this.orderModel = Order;
  }

  async getAllOrders() {
    const orders = await this.orderModel.find().populate("user_id");
    if (!orders) {
      throw new BaseException("Buyurtmalar topilmadi", 404);
    }
    return orders;
  }

  async getOrderById(id) {
    const order = await this.orderModel.findById(id).populate("user_id");
    if (!order) {
      throw new BaseException("Buyurtma topilmadi", 404);
    }
    return order;
  }

  async createOrder(data) {
    const order = await this.orderModel.create(data);
    return order;
  }

  async updateOrderById(id, data) {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!updatedOrder) {
      throw new BaseException("Buyurtma yangilashda xatolik", 404);
    }
    return updatedOrder;
  }

  async deleteOrderById(id) {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id);
    if (!deletedOrder) {
      throw new BaseException("Buyurtma topilmadi", 404);
    }
    return {
      message: "Buyurtma o'chirildi",
      data: deletedOrder,
    };
  }
}

export default new OrderService();
