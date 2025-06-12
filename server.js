require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerDocument = require('./swagger.json');
const campusRoutes = require('./routes');
const passport = require('./utils/passport');
const appConfig = require('./config');

const app = express();

app.set('trust proxy', 1);

app
  .use(express.json())
  .use(
    cors({
      origin: appConfig.origin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }),
  )
  .use(require('./middlewares/express-session.middleware'))
  .use(passport.initialize())
  .use(passport.session());
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
 * Routes
 *************************/
app.use('/', campusRoutes);

// Global Error Handler - JSON only
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
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
