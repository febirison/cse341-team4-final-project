const mongoose = require('mongoose');
const appConfig = require('../config/index');

async function connectToDb() {
  try {
    await mongoose.connect(appConfig.db, {
      dbName: 'cse341-team4-final-project', //the Team's DB name
    });
    console.log('✅ Connected to MongoDB with Mongoose');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
  }
}

module.exports = { connectToDb };
