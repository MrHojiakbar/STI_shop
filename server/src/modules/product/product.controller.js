import productService from "./product.service.js";

export const AllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.send({
      message: "success",
      data: products,
    });
  } catch (err) {
    next(err)
  }
  
};

export const ProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await productService.getProductById(id);
    res.send({
      message: "success",
      data: product,
    });
  } catch (err) {
    next(err)
  }
  
};

export const createProduct = async (req, res, next) => {
  try {
    const {name,description,price,quantity,category_id,user_id} = req.body;
    const file = req.file;
    const imageUrl=`/uploads/${file.mimetype.split("/")[0]}/${file.filename}`
    const data={name,imageUrl,description,price,quantity,category_id,user_id}
    const product = await productService.createProduct(data);
    res.send({
      message: "success",
      data: product,
    });
  } catch (err) {
    next(err)
  }
  
};
export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;    
    const {name,description,price,quantity,category_id,user_id} = req.body;
    const data={name,description,price,quantity,category_id,user_id}
    const product = await productService.updateProductyById(id,data);
    res.send({
      message: "success",
      data: product,
    });
  } catch (err) {
    next(err)
  }
    
};
export const deleteProduct= async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await productService.deleteProductById(id);
    res.send({
      message: "success",
      data: product,
    });
  } catch (err) {
    next(err)
  }
    
};