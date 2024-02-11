import mongoose from 'mongoose';
import 'dotenv/config';
const { DB_HOST } = process.env;

const connectToDatabase = async () => {
    try {
        const connection = mongoose.connect(DB_HOST);
        if (connection) {
            console.log('Connection established');
        }
    } catch (error) {
        console.log('error in connectToDatabase', error);
        throw error;
    }
};

export default connectToDatabase;
