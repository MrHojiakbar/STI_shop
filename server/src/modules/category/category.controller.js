import categoryService from "./category.service.js";

export const AllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.send({
    message: "success",
    data: categories,
  });
};

export const CategorieById = async (req, res) => {
  const id = req.params.id;
  const category = await categoryService.getCategoryById(id);
  res.send({
    message: "success",
    data: category,
  });
};

export const createCategory = async (req, res) => {
  const {name} = req.body;
  const category = await categoryService.createCategory(name);
  res.send({
    message: "success",
    data: category,
  });
};
export const updateCategory = async (req, res) => {
    const id = req.params.id;
    const {name} = req.body;
    
    const category = await categoryService.updateCategoryById(id,name);
    res.send({
      message: "success",
      data: category,
    });
};
export const deleteCategory = async (req, res) => {
    const id = req.params.id;
    const category = await categoryService.deleteCategoryById(id);
    res.send({
      message: "success",
      data: category,
    });
};