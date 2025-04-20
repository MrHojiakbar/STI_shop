import {Router} from "express"
import { Protected } from "../../middleware/protected.middleware.js";
import { CheckRoles } from "../../middleware/guard.middleware.js";
import { createCartItem, deleteCartItemById, getAllCartItems, getCartItemById, updateCartItemById } from "./cartItem.controller.js";

const cartItemRouter = Router()

cartItemRouter.get("/:id",Protected(true),CheckRoles(["ALL"]),getCartItemById );
cartItemRouter.get("/",Protected(true),CheckRoles(["ALL"]),getAllCartItems);
cartItemRouter.post("/create",Protected(false),CheckRoles(["ALL"]),createCartItem)
cartItemRouter.delete("/delete/:id",Protected(true),CheckRoles(["ALL"]),deleteCartItemById)
cartItemRouter.patch("/update/:id",Protected(true),CheckRoles(["ALL"]),updateCartItemById)

export default cartItemRouter