import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    const mongoURL = process.env.MONGO_URI;
    try {
        await mongoose.connect(mongoURL!);
    } catch (error) {
        console.log(`Error while connecting : `, error);
    }

    const connection = mongoose.connection;

    if (connection.readyState >= 1) {
        console.log('Connected');
        return;
    }

    connection.on('error', () => console.log('Connection failed'));
};

export default connectDB;