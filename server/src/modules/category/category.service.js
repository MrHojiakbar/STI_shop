import { BaseException } from "../../errors/base.error.js";
import Category from "./category.model.js";

class CategoryService{
    constructor() {
        this.categoryModel=Category
    }
    async getCategoryById(id) {
        const findCategory=await this.categoryModel.findById(id)
        if (!findCategory) {
            throw new BaseException('Category not found', 409);
        }
        return findCategory
    }
    async getAllCategories() {
        const findCategory=await this.categoryModel.find()
        return findCategory
    }
    async createCategory(name) {
        const findCategory=await this.categoryModel.findOne({name})
        if (findCategory) {
            throw new BaseException('Category already exsists', 409);
        }
        const newCategory = await this.categoryModel.create({name})
        return newCategory
    }
    async updateCategoryById(id,name) {
        const findCategory=await this.categoryModel.findById(id)
        if (!findCategory) {
            throw new BaseException('Category not found', 409);
        }
        console.log(name);
        
        const updatedCategory = await this.categoryModel.findOneAndUpdate(
            { _id: id },
            { $set: {name} },
            { new: true })
        return updatedCategory
    }
    async deleteCategoryById(id) {
        const findCategory=await this.categoryModel.findById(id)
        if (!findCategory) {
            throw new BaseException('Category not found', 409);
        }
        const deletedCategory = await this.categoryModel.findOneAndDelete(id)
        return deletedCategory
    }
}

export default new CategoryService()