import {config} from "dotenv"
import mongoose from "mongoose"
import { MONGO_URL } from "./app.config.js"

config()

export const connectDB=async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("DB connected ✅🗿");
    } catch (err) {
        console.log("DB not connected ❌");
        process.exit(1)
    }
}
