const asyncHandler = require('express-async-handler');
const db = require('../models');
const User = db.user;

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, birthday, email, password, role, phoneNumber } = req.body;

  if (!firstName || !lastName || !birthday || !email || !password || !role) {
    res.status(400).json({ message: 'All fields are required' });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists with this email');
  }
  const user = await User.create({
    firstName,
    lastName,
    birthday,
    email,
    password,
    role,
    phoneNumber
  });

  if (user) {
    // with the login sucessful, create a session
    req.session.userId = user._id;
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      message: 'User registered and logged successfully',
    });
    } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc   Auth user and create a session
// @route  POST /api/auth/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        // with the login sucessful, create a session
        req.session.userId = user._id;
        res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        message: 'User logged in successfully',
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc   Logout user and destroy session
// @route  POST /api/auth/logout
// @access Private 
const logoutUser = asyncHandler(async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500);
            throw new Error('Failed to log out, please try again');
        } 
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ message: 'User logged out successfully' });
    });
});

// @desc   Get user profile logged in
// @route  GET /api/auth/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.session.userId; // Get user ID from session
    if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, please log in');
    }
    res.json({
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        role: req.user.role
    });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile
};