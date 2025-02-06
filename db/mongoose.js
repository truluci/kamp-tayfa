import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: "./config/.env"
});

mongoose.connect(process.env.MONGODB_URI);