const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Civix API',
      version: '1.0.0',
      description: 'API documentation for Civix - Civic Issue Reporting Platform',
    },
    servers: [
  {
    url: process.env.NODE_ENV === 'production'
      ? 'https://civix-sqp4.onrender.com/api'
      : 'http://civix-sqp4.onrender.com:5000/api',
    description: process.env.NODE_ENV === 'production' ? 'Render (Live)' : 'Local',
  },
],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };