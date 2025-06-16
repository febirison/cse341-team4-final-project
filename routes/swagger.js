const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');

const router = express.Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Campus Coordinator API',
      version: '1.0.0',
      description:
        'This is an API server for the Campus Coordinator API project',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Change to our url on render.com (web service) later
      },
    ],
  },
  apis: ['./routes/*.js'], // Read JSDoc from all routes
};

const swaggerSpec = swaggerJSDoc(options);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
