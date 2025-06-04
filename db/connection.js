const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load info from .env

const url = process.env.MONGODB_URI; // Your MongoDB URL

async function connectToDb() {
  try {
    await mongoose.connect(url, {
      dbName: 'cse341-team4-final-project', //the Team's DB name
    });
    console.log('✅ Connected to MongoDB with Mongoose');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
  }
}

module.exports = { connectToDb };
