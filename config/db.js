const mongoose = require('mongoose');
require('dotenv').config(); // Using dotenv for environment variables

const connectDB = async () => {
    try {
        // Access MongoDB URI from environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = connectDB;
