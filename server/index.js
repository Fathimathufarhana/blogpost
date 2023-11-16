import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/auth.js"
import User from "./models/User.js";



dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(cors());


app.use("/auth",authRoutes);


app.get("/get",async (req, res) => {
    try {
        const savedUser =await User.find();
        res.json(savedUser)
    } catch (error) {
        res.json(error.message)
    }
})


const PORT = process.env.PORT || 6001;

const connect = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
      console.log('Connected to database');
    } catch (error) {
        const { status, message } = error;
        console.log(status, message,"database connection error")
    }
}

app.listen(process.env.PORT,() =>{
    connect()
    console.log(`Server running... ${PORT} `)

   })