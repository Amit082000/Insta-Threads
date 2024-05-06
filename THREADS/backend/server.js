import express from 'express';
import dotenv from "dotenv";
const app = express();

const port = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log("server started !!");
})