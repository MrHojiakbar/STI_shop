import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import userRouter from "./modules/user/user.route.js";
import categoryRouter from "./modules/category/category.route.js";
import { ErrorHandlerMiddleware } from "./middleware/error-handler.middleware.js";
import productRouter from "./modules/product/product.route.js";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({
     origin: "*" 
}));

if (process.env.NODE_ENV === "develop") {    
    app.use(morgan("tiny"));
}

app.use("/user", userRouter);
app.use("/category",categoryRouter)
app.use("/product",productRouter)


app.use((_, res, __) => {
    res.send("404");
  });

app.use(ErrorHandlerMiddleware)



export default app;
