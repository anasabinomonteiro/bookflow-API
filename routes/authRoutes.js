// This file defines the routes for user authentication, including registration, login, and fetching user profile information.
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

//Rotas para autenticação

/**
 * @swagger
 * /register:  # Caminho relativo, o prefixo /api/auth será adicionado pelo swagger.js
 * post:
 * summary: Register a new user
 * description: Creates a new user account and automatically logs them in, establishing a session. No token is returned; a session cookie is set.
 * tags: [Authentication]
 * parameters:
 * - in: body
 * name: user
 * description: User object for registration
 * required: true
 * schema:
 * type: object
 * properties:
 * firstName: { type: string, example: "Jane" }
 * lastName: { type: string, example: "Doe" }
 * birthday: { type: string, format: date, example: "1995-10-20" }
 * email: { type: string, format: email, example: "jane.doe@example.com" }
 * password: { type: string, example: "StrongPass123" }
 * role: { type: string, enum: ["user", "admin"], example: "user" }
 * phoneNumber: { type: string, example: "+1234567890" }
 * required: [firstName, lastName, birthday, email, password, role]
 * responses:
 * 201:
 * description: User registered and logged in successfully (session cookie set)
 * schema:
 * type: object
 * properties:
 * _id: { type: string }
 * firstName: { type: string }
 * lastName: { type: string }
 * email: { type: string }
 * role: { type: string }
 * message: { type: string, example: "User registered and logged in successfully." }
 * 400:
 * description: Bad Request / User already exists
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /login: # Caminho relativo
 * post:
 * summary: Authenticate user and establish session
 * description: Logs in a user with email and password. A session cookie is set upon successful authentication; no token is returned.
 * tags: [Authentication]
 * parameters:
 * - in: body
 * name: credentials
 * description: User credentials (email and password)
 * required: true
 * schema:
 * type: object
 * properties:
 * email: { type: string, format: email, example: "jane.doe@example.com" }
 * password: { type: string, example: "StrongPass123" }
 * required: [email, password]
 * responses:
 * 200:
 * description: Login successful (session cookie set)
 * schema:
 * type: object
 * properties:
 * _id: { type: string }
 * firstName: { type: string }
 * lastName: { type: string }
 * email: { type: string }
 * role: { type: string }
 * message: { type: string, example: "Logged in successfully." }
 * 401:
 * description: Unauthorized / Invalid credentials
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /logout: # Caminho relativo
 * post:
 * summary: Logout user and destroy session
 * description: Destroys the current user session and clears the session cookie. Requires an active session.
 * tags: [Authentication]
 * responses:
 * 200:
 * description: Logged out successfully.
 * 500:
 * description: Could not log out, please try again.
 */
router.post('/logout', protect, logoutUser);

/**
 * @swagger
 * /profile: # Caminho relativo
 * get:
 * summary: Get user profile
 * description: Retrieves the profile information of the authenticated user. Requires an active session.
 * tags: [Authentication]
 * responses:
 * 200:
 * description: User profile retrieved successfully
 * schema:
 * type: object
 * properties:
 * _id: { type: string }
 * firstName: { type: string }
 * lastName: { type: string }
 * email: { type: string }
 * role: { type: string }
 * 401:
 * description: Not authenticated.
 */
router.get('/profile', protect, getUserProfile);

module.exports = router;
