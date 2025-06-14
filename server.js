require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const session = require('express-session'); // 0auth
const MongoStore = require('connect-mongo'); // 0auth

const port = process.env.PORT || 3000;

// Connect to MongoDB
const db = require('./models');
db.mongoose
  .connect(process.env.MONGODB_URI || db.url)
  // .connect(db.url) // ⬅️ Deprecated options removed
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.error('Cannot connect to the database!', err);
    process.exit();
  });

// Express session configuration - 0auth
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || db.url,
    collectionName: 'sessions',
    ttl: 60 * 60, // 1 hour
    autoRemove: 'interval',
    autoRemoveInterval: 10 // In minutes
  }),
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'lax' // Protection CSRF (Cross-Site Request Forgery)
  }
}));

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

// Authentication routes
app.use('/api/auth', require('./routes/authRoutes'));

// Main routes
app.use('/', require('./routes')); // ✅ Only once

// Swagger configuration
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
