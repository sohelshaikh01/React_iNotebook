import mongoose from 'mongoose'; 
const mongoURI = 'mongodb://127.0.0.1:27017/inotebook';
// Use localhost server code not just name.

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo successfully");
    } catch (err) {
        console.error("Failed to connect to Mongo", err);
    }
};

export default connectToMongo;
