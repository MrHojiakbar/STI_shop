import {Router} from "express"
import { deleteUser, getUserById, login, register, updateUser } from "./user.controller.js"

const userRouter = Router()

userRouter.get("/:id", getUserById);
userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.delete("/delete/:id",deleteUser)
userRouter.patch("/update/:id",updateUser)

export default userRouter