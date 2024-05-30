import express from 'express';
import dotenv from "dotenv";
import connectDb from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import {v2 as cloudinary} from "cloudinary";

dotenv.config();

connectDb();
const app = express();

const port = process.env.PORT ;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(cookieParser());


//routes
app.use('/api/users',userRoutes);
app.use('/api/post',postRoutes);


app.listen(port, () => {
    console.log("server started !!");
})