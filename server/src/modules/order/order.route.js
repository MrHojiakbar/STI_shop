import {Router} from "express"
import { Protected } from "../../middleware/protected.middleware.js";
import { CheckRoles } from "../../middleware/guard.middleware.js";
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from "./order.controller.js";

const orderRouter = Router()

orderRouter.get("/:id",Protected(true),CheckRoles(["ALL"]),getOrderById );
orderRouter.get("/",Protected(true),CheckRoles(["ALL"]),getAllOrders);
orderRouter.post("/create",Protected(false),CheckRoles(["ALL"]),createOrder)
orderRouter.delete("/delete/:id",Protected(true),CheckRoles(["ALL"]),deleteOrder)
orderRouter.patch("/update/:id",Protected(true),CheckRoles(["ALL"]),updateOrder)

export default orderRouter