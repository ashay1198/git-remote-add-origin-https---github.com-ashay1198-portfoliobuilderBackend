// swagger-config.js
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger definition
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A description of my API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Your server URL
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
