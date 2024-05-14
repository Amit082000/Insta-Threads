import express from 'express';
import dotenv from "dotenv";
import connectDb from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
dotenv.config();

connectDb();
const app = express();

const port = process.env.PORT ;

app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//routes
app.use('/api/users',userRoutes);


app.listen(port, () => {
    console.log("server started !!");
})