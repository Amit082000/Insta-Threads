import mongoose from "mongoose";


const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("mongoose connected to db");
        
    } catch (error) {
        console.log(error.message);
        
    }

}

export default connectDb;