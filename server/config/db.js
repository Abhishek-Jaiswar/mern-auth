import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}${'exploreBlog'}`)
        console.log('Database is connected!');
    } catch (error) {
        console.log("Something went wrong in connection!");
        console.log(error);
        process.exit(1)
    }
}

export default connectToDb