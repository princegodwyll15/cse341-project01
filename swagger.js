const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Contact API",
        description: "API for managing contacts"
    },
    host: "localhost:3000",
    schemes: ['http', 'https'] // Ensure 'http' is included for localhost
};

const outputFile = './swagger.json';
const endPointFile = ["./routes/index.js"]; // Include all route files

swaggerAutogen(outputFile, endPointFile, doc);