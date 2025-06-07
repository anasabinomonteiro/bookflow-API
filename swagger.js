const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Bookflow API',
        description: 'API for managing bookflow operations',
    },
    host: process.env.SWAGGER_HOST || 'localhost:3000',
    schemes: [process.env.SWAGGER_SCHEME || 'http'],
    tags: [
        {
            name: 'Books',
            description: 'Operations related to books',
        },
        {
            name: 'Authors',
            description: 'Operations related to authors',
        },      
    ],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate the Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc)
    .then(() => {
        console.log('Swagger documentation generated successfully.');
    })
    .catch((error) => {
        console.error('Error generating Swagger documentation:', error);
    });