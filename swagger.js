const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/authRoutes.js', './routes/index.js'];

const doc = {
    info: {
        title: 'Bookflow API',
        description: 'API for managing bookflow operations',
    },
    host: process.env.SWAGGER_HOST || 'localhost:3000',
    schemes: [process.env.SWAGGER_SCHEME || 'http'],
    tags: [
        {
            name: 'Authentication',
            description: 'Operations related to user authentication and session management',
        },
        {
            name: 'Books',
            description: 'Operations related to books',
        },
        {
            name: 'Authors',
            description: 'Operations related to authors',
        },
        {
            name: 'Users',
            description: 'Operations related to users',
        },
        {
            name: 'Loans',
            description: 'Operations related to loans',
        }
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Cookie',
            in: 'header',
            description: 'Session authentication using cookies',
        }
    },
    definitions: {
        UserAuthResponse: {
            _id: '60d5ec49f1c7d23a6c8e4f1e',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@email.com',
            role: 'user',
            message: 'User registered and logged in successfully.',
        },
        UserProfileResponse: {
            _id: '60d5ec49f1c7d23a6c8e4f1e',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@email.com',
            role: 'user',
        },
    }
};

// Generate the Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc)
    .then(() => {
        console.log('Swagger documentation generated successfully.');
    })
    .catch((error) => {
        console.error('Error generating Swagger documentation:', error);
    });