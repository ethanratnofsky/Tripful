const mongoose = require("mongoose");

require("dotenv").config();

const connectMongoDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        // TODO: Ensure that you have your MongoDB URI in your .env file, then uncomment the line below
        // mongoose.connect(process.env.MONGODB_URI);
    } catch (err) {
        console.error(err.message);
    } finally {
        console.log("Successfully connected to MongoDB!");
    }
};

module.exports = connectMongoDB;
