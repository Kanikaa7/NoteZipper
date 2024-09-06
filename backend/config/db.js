const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(`error in mongoDB connection: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;