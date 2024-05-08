import express from 'express';
import dotenv from "dotenv";
import connectDb from './db/connectDB.js';

dotenv.config();

connectDb();
const app = express();

const port = process.env.PORT ;

app.listen(port, () => {
    console.log("server started !!");
})