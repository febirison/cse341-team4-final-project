require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./db/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(express.json());

/* ***********************
 * Swagger route (place before the Middleware)
 * ************************/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ***********************
 * Middleware
 * ************************/
// Simple CORS setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

/* ***********************
 * Routes
 *************************/
app.get('/', (req, res) => {
  res.json({ message: 'Campus Coordinator API is running!' });
});

/* ***********************
 * Server
 *************************/
connectToDb().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}.`);
  });
});
