const asyncHandler = require('express-async-handler');
const db = require('../models');
const e = require('express');
const User = db.user;

// middleware to protect session
const protect = asyncHandler(async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
        req.user = await User.findById(req.session.userId).select('-password');
        if (!req.user) {
            req.session.destroy(err => {
                if (err) console.errosr('Session destruction error:', err);
            });
            res.clearCookie('connect.sid');
                res.status(401);
                throw new Error("Unauthorized access, please log in again");
                }
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        req.session.destroy(err => {
            if (err) console.error('Session destruction error:', err);
        });
        res.clearCookie('connect.sid');
        res.status(401);
        throw new Error("Unauthorized access, please log in again");
    }
    } else {
        res.status(401);
        throw new Error("Not authorized, no active session found");
    }
});

// middleware to verify is the user has permited roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
        res.status(403);
        throw new Error(`Access denied: Role ${req.user ? req.user.role : 'undefined'} is not authorized`);
        }
        next();
    };
};

module.exports = { protect, authorizeRoles };
