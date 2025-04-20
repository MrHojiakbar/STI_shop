import { BaseException } from "../../errors/base.error.js";
import Product from "./product.model.js";

class ProductService{
    constructor() {
        this.productModel=Product
    }
    async getProductById(id) {
        const findProduct=await this.productModel.findById(id).populate("users")
        if (!findProduct) {
            throw new BaseException('Category not found', 409);
        }
        return findProduct
    }
    async getAllProducts() {
        const findProduct=await this.productModel.find().populate("user_id").populate("category_id")
        return findProduct
    }
    async createProduct(data) {
        console.log(data);
        
        const newProduct = await this.productModel.create(data)
        return newProduct
    }
    async updateProductyById(id,data) {
        const findProduct=await this.productModel.findById(id)
        if (!findProduct) {
            throw new BaseException('Product not found', 409);
        }
        
        const updatedProduct = await this.productModel.findOneAndUpdate(
            { _id: id },
            { $set: data },
            { new: true })
        return updatedProduct
    }
    async deleteProductById(id) {
        const findProduct=await this.productModel.findById(id)
        if (!findProduct) {
            throw new BaseException('Product not found', 409);
        }
        const deletedProduct = await this.productModel.findOneAndDelete(id)
        return deletedProduct
    }
}

export default new ProductService()