const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('connected to DDBB!');
  } catch (error) {
    console.log('Error connecting with DDBB!');
  }
};

module.exports = { connectDB };
