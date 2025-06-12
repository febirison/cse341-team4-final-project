const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: String,
  username: String,
  email: String,
  avatarUrl: String,
});

module.exports = mongoose.model('User', userSchema);
