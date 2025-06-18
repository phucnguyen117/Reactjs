import mongoose from "mongoose";

// function to connect to the mongodb database
const connectDB = async () => {

    mongoose.connection.on('connected',() => console.log('Kết nối Database thành công!'));

    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal?retryWrites=true&w=majority`)

}

export default connectDB
