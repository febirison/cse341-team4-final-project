const dotenv = require('dotenv');

dotenv.config();

const appConfig = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  env: process.env.NODE_ENV || 'development',
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp',
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL:
      process.env.GITHUB_CALLBACK_URL ||
      'http://localhost:3000/auth/github/callback',
  },
  origin: process.env.ORIGIN || 'localhost',
};

module.exports = appConfig;
