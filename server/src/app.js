import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import { ErrorHandlerMiddleware } from "./middleware/error-handler.middleware.js";
import userRouter from "./modules/user/user.route.js";
import categoryRouter from "./modules/category/category.route.js";
import productRouter from "./modules/product/product.route.js";
import orderRouter from "./modules/order/order.route.js";
import cartItemRouter from "./modules/cartItem/cartItem.route.js";
import path from "path";
import passwordResetrouter from "./modules/passwordReset/passwordReset.route.js";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({
     origin: process.env.CORS,
     credentials: true 
}));

if (process.env.NODE_ENV === "develop") {    
    app.use(morgan("tiny"));
}
app.use('/uploads/image', express.static(path.join(process.cwd(), 'uploads/image')));
app.use("/user", userRouter);
app.use("/category",categoryRouter)
app.use("/product",productRouter)
app.use("/order",orderRouter)
app.use("/orderItem",orderRouter)
app.use("/cartItem",cartItemRouter)
app.use("/reset-password", passwordResetrouter)


app.use((_, res, __) => { 
    res.send("404");
  });

app.use(ErrorHandlerMiddleware)



export default app;
