import { BaseException } from "../../errors/base.error.js";
import { createProductSchema, updateProductSchema } from "./dtos/product.schema.js";
import productService from "./product.service.js";

export const AllProducts = async (req, res, next) => {
  try {
    const { category_id } = req.query;
    let filter={}
    if(category_id=="68061c68ba6300d1f52080da"){
      filter={}
    }
    else if (category_id) {
      filter.category_id = category_id;
    }
    const products = await productService.getAllProducts(filter);
    res.send({
      message: "success",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

export const ProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        throw new BaseException("id is not valid",400);
      }
    const product = await productService.getProductById(id);
    res.send({
      message: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { error, value } = createProductSchema.validate(req.body);
    if (error) {
      throw new BaseException(error.message, 400);
    }
    const { name, description, price, quantity, category_id} =
      req.body;
    
      
    const user_id= req.user.id;
    const file = req.file;
    const imageUrl = `/uploads/${file.mimetype.split("/")[0]}/${file.filename}`;
    const data = {
      name,
      imageUrl,
      description,
      price,
      quantity,
      category_id,
      user_id,
    };
    const product = await productService.createProduct(data);
    res.send({
      message: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    const { error, value } = updateProductSchema.validate(req.body);
    if (error) {
      throw new BaseException(error.message, 400);
    }
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      throw new BaseException("id is not valid",400);
    }
    const { name, description, price, quantity, category_id, user_id } =
      req.body;
    const data = { name, description, price, quantity, category_id, user_id };
    const product = await productService.updateProductyById(id, data);
    res.send({
      message: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      throw new BaseException("id is not valid",400);
    }
    const product = await productService.deleteProductById(id);
    res.send({
      message: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
