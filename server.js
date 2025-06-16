require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');

require('./auth/github'); // GitHub OAuth setup
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerDocument = require('./swagger.json');
const campusRoutes = require('./routes');
//const appConfig = require('./config');

const app = express();

app.use(express.json());

/* Session + Passport */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware to catch JSON parse error
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON format' });
  }
  next(err);
});

/* ***********************
 * Swagger route (place before the Middleware)
 * ************************/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ***********************
 * Cors
 *************************/
app.use(
  cors({
    origin: 'https://cse341-team4-final-project-nh1g.onrender.com', // put specific URL ex. http://localhost:3000 https://cse341-team4-final-project-nh1g.onrender.com
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

/* ***********************
 * Routes
 *************************/
app.use('/', campusRoutes);

/* ***********************
 * Global Error Handler
 *************************/
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

//glbal error handler for Oauth
process.on('uncaughtException', (err, origin) => {
  console.error('❗ Uncaught Exception:', err.message);
  console.error('Origin:', origin);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❗ Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
});

/* ***********************
 * Server (WE06-move to start.js)
 ************************
connectToDb()
  .then(() => {
    app.listen(appConfig.port, () => {
      console.log(`🚀 Server is running on port ${appConfig.port}.`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }); */

module.exports = app; // for export app to test
