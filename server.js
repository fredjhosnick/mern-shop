import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import mongoose from './models/userModel';


//configure env
require('dotenv').config();

//databse config
connectDB();

//rest object
const mongoose = require('mongoose')
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req,res)=>{
  res.send("<h1>Welcome to ecommerce app</h1>");
})

//PORT
const PORT = process.env.PORT || 8080;

mongoose.setMaxListeners('strictQuery' ,false);
const connectDB = async ()=>{
  try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
  }catch(error){
    console.log(error)
    process.exit(1);

  }
}
//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});