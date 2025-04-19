import {Router} from "express"
import { Protected } from "../../middleware/protected.middleware.js";
import { CheckRoles } from "../../middleware/guard.middleware.js";
import { createOrderItem, deleteOrderItem, getAllOrderItems, getOrderItemById, updateOrderItem } from "./orderItem.controller.js";

const orderItemRouter = Router()

orderItemRouter.get("/:id",Protected(true),CheckRoles(["ALL"]),getOrderItemById );
orderItemRouter.get("/",Protected(true),CheckRoles(["ALL"]),getAllOrderItems);
orderItemRouter.post("/create",Protected(false),CheckRoles(["ALL"]),createOrderItem)
orderItemRouter.delete("/delete/:id",Protected(true),CheckRoles(["ALL"]),deleteOrderItem)
orderItemRouter.patch("/update/:id",Protected(true),CheckRoles(["ALL"]),updateOrderItem)

export default orderItemRouter