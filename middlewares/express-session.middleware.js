const session = require('express-session');
const appConfig = require('../config');

const sessionMiddleware = session({
  secret: appConfig.jwt.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: appConfig.env === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: appConfig.env === 'production' ? 'none' : 'lax',
    domain:
      appConfig.env === 'production'
        ? 'cse341-library-api-wlf4.onrender.com'
        : undefined,
  },
  proxy: appConfig.env === 'production',
});

module.exports = sessionMiddleware;
