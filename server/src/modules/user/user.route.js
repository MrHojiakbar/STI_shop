import {Router} from "express"
import { deleteUser, getUserById, login, register, updateUser } from "./user.controller.js"
import { Protected } from "../../middleware/protected.middleware.js";
import { CheckRoles } from "../../middleware/guard.middleware.js";
import { upload } from "../../configs/multer.config.js";

const userRouter = Router()

userRouter.get("/:id", getUserById);
userRouter.post("/register",upload.single("image"),Protected(false),CheckRoles(["ALL"]),register)
userRouter.post("/login",Protected(false),CheckRoles(["ALL"]),login)
userRouter.delete("/delete/:id",Protected(true),CheckRoles(["ADMIN","MANAGER"]),deleteUser)
userRouter.patch("/update/:id",Protected(true),CheckRoles(["ADMIN","MANAGER"]),updateUser)

export default userRouter