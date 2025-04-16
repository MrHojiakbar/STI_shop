import express from "express";
import cors from "cors"
import { config } from "dotenv";
import morgan from "morgan"

config()

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:"*"
}))

if (process.env.NODE_ENV=="develop") {
    app.use(morgan("tiny"))
}

export default app