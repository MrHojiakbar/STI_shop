import categoryService from "./category.service.js";

export const AllCategories = async (req, res, next) => {
  try {
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
    const id = req.params.id;
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
    const category = await categoryService.deleteCategoryById(id);
    res.send({
      message: "success",
      data: category,
    });
  } catch (err) {
    next(err)
  }
    
};