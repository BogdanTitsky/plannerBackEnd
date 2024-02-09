import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        const connection = mongoose.connect(
            'mongodb+srv://bogdantitsky:rBbSRrWqigvd4HO7@cluster0.8giyfh7.mongodb.net/planer?retryWrites=true&w=majority'
        );
        if (connection) {
            console.log('Connection established');
        }
    } catch (error) {
        console.log('error in connectToDatabase', error);
        throw error;
    }
};

export default connectToDatabase;
