const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_CONNECTION_STRING;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
