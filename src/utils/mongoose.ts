import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27018/climedo';
let mongooseConnection = new mongoose.Mongoose();

const connectMongo = async () => {
    mongooseConnection = await mongoose.connect(mongoUri);
}

connectMongo()
    .then(() => console.log('Connection with Mongo was successful'))
    .catch(err => console.log('rror while connecting with Mongo:', err))


export default mongooseConnection;