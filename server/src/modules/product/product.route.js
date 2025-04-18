import {Router} from "express"
import { Protected } from "../../middleware/protected.middleware.js";
import { CheckRoles } from "../../middleware/guard.middleware.js";
import { AllProducts, createProduct, deleteProduct, ProductById, updateProduct } from "./product.controller.js";
import { upload } from "../../configs/multer.config.js";


const productRouter = Router()

productRouter.get("/:id",Protected(true),CheckRoles(["ALL"]), ProductById);
productRouter.get("/",Protected(true),CheckRoles(["ALL"]), AllProducts);
productRouter.post("/create",upload.single("image"),Protected(true),CheckRoles(["ALL"]),createProduct)
productRouter.patch("/update/:id",Protected(true),CheckRoles(["ALL"]),updateProduct)
productRouter.delete("/delete/:id",Protected(true),CheckRoles(["ALL"]),deleteProduct)

export default productRouter
