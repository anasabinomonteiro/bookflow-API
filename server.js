require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

const port = process.env.PORT || 3000;

// Connect to MongoDB
const db = require('./models');
db.mongoose
  .connect(db.url) // ⬅️ Deprecated options removed
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.error('Cannot connect to the database!', err);
    process.exit();
  });

app
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
  })
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes')); // ✅ Only once

// Swagger configuration
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
