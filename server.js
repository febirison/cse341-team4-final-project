require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./db/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const campusRoutes = require('./routes');

const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const clubRoutes = require('./routes/clubs');
const roomRoutes = require('./routes/rooms');

const app = express();

app.use(express.json());
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
 * Middleware
 * ************************/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

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

app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
app.use('/clubs', clubRoutes);
app.use('/rooms', roomRoutes);

/* ***********************
 * Server
 *************************/
connectToDb()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });
