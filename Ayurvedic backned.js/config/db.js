const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Yeh line .env se MONGO_URI ka URL uthayegi
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;