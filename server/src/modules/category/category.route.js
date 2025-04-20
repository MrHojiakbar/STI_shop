import {Router} from "express"
import { AllCategories, CategorieById, createCategory, deleteCategory, updateCategory } from "./category.controller.js";
import { Protected } from "../../middleware/protected.middleware.js";
import { CheckRoles } from "../../middleware/guard.middleware.js";


const categoryRouter = Router()

categoryRouter.get("/:id",Protected(true),CheckRoles(["ADMIN","MANAGER"]), CategorieById);
categoryRouter.get("/",Protected(false),CheckRoles(["ALL"]), AllCategories);
categoryRouter.post("/create",Protected(true),CheckRoles(["ADMIN","MANAGER"]),createCategory)
categoryRouter.patch("/update/:id",Protected(true),CheckRoles(["ADMIN","MANAGER"]),updateCategory)
categoryRouter.delete("/delete/:id",Protected(true),CheckRoles(["ADMIN","MANAGER"]),deleteCategory)

export default categoryRouter