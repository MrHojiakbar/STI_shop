import {Router} from "express"
import { AllCategories, CategorieById, createCategory, deleteCategory, updateCategory } from "./category.controller.js";


const categoryRouter = Router()

categoryRouter.get("/:id", CategorieById);
categoryRouter.get("/", AllCategories);
categoryRouter.post("/create",createCategory)
categoryRouter.patch("/update/:id",updateCategory)
categoryRouter.delete("/delete/:id",deleteCategory)

export default categoryRouter