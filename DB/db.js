import mongoose from "mongoose";


const connectToMongoDB = async () => {
    try{

        await mongoose.connect(process.env.MONGO_URL)
    console.log('connected to MongoDB Successfully ');
    }catch(err){
        console.log('Error in connecting db',err);
    }
}
export { connectToMongoDB };