import express from "express";
import { connectDB } from "./config/db.js";
import adminRouter from "./routes/adminRoute.js";

const app = express()

app.use(express.json());
app.use("/api/auth",adminRouter)

connectDB();

app.listen(3000,()=>{
    console.log("Server Started Successfully...")
})