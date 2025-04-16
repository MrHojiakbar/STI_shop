import app from "./app.js";
import { APP_PORT } from "./configs/app.config.js";
import { connectDB } from "./configs/mongo.config.js";

connectDB()

app.listen(APP_PORT,()=>{
    console.log(`http://localhost:${APP_PORT}`);
})