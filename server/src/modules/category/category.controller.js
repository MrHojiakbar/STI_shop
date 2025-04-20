import categoryService from "./category.service.js";
import { createCategorySchema, updateCategorySchema } from "./dtos/category.schema.js";
import {isValidObjectId} from "mongoose"

export const AllCategories = async (req, res, next) => {
  try {
    console.log("keldi");
    
    const categories = await categoryService.getAllCategories();
    res.send({
      message: "success",
      data: categories,
    });
  } catch (err) {
    next(err)
  }
  
};

export const CategorieById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      throw new BaseException("id is not valid",400);
    }
    const category = await categoryService.getCategoryById(id);
    res.send({
      message: "success",
      data: category,
    });
  } catch (err) {
    next(err)
  }
  
};

export const createCategory = async (req, res, next) => {
  try {
    const {error,value}=createCategorySchema.validate(req.body)
    if (error) {
      throw new BaseException(error.message,400);
      
    }
    const {name} = req.body;
    const category = await categoryService.createCategory(name);
    res.send({
      message: "success",
      data: category,
    });
  } catch (err) {
    next(err)
  }
  
};
export const updateCategory = async (req, res, next) => {
  try {
    const {error,value}=updateCategorySchema.validate(req.body)
    if (error) {
      throw new BaseException(error.message,400);
      
    }
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      throw new BaseException("id is not valid",400);
    }
    const {name} = req.body;
    
    const category = await categoryService.updateCategoryById(id,name);
    res.send({
      message: "success",
      data: category,
    });
  } catch (err) {
    next(err)
  }
    
};
export const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      throw new BaseException("id is not valid",400);
    }
    const category = await categoryService.deleteCategoryById(id);
    res.send({
      message: "success",
      data: category,
    });
  } catch (err) {
    next(err)
  }
    
};