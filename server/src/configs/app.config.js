import {config} from "dotenv"

config()

export const APP_PORT=+process.env.APP_PORT
export const CORS=process.env.CORS
export const MONGO_URL=process.env.MONGO_URL