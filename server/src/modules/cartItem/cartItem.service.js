// cartItem.service.js
import CartItem from "./cartItem.model.js";
import { BaseException } from "../../errors/base.error.js";

class CartItemService {
  constructor() {
    this.cartItemModel = CartItem;
  }

  async getAllCartItems() {
    const items = await this.cartItemModel.find().populate("user_id").populate("product_id");
    if (!items) {
      throw new BaseException("Cart bo'sh", 404);
    }
    return items;
  }

  async getCartItemById(id) {
    const item = await this.cartItemModel.findById(id).populate("user_id").populate("product_id");
    if (!item) {
      throw new BaseException("Cart item topilmadi", 404);
    }
    return item;
  }

  async createCartItem(data) {
    const item = await this.cartItemModel.create(data);
    return item;
  }

  async updateCartItemById(id, data) {
    const updatedItem = await this.cartItemModel.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!updatedItem) {
      throw new BaseException("Cart item yangilanmadi", 404);
    }
    return updatedItem;
  }

  async deleteCartItemById(id) {
    const deletedItem = await this.cartItemModel.findByIdAndDelete(id);
    if (!deletedItem) {
      throw new BaseException("Cart item topilmadi", 404);
    }
    return {
      message: "Cart item o'chirildi",
      data: deletedItem,
    };
  }
}

export default new CartItemService();
