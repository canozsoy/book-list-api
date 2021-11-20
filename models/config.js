const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = connectDB;
