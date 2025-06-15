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

//Trust and create cookie on Render
app.set('trust proxy', 1);

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
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'  // 'none' for cross-site in production (secure: true)
  }
}));

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:3000', // local
            'https://bookflow-api-osy4.onrender.com' // API on Render
          ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })));

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
