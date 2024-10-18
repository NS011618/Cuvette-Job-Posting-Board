const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { register, login, getUser, verifyOTP, updateUser } = require('../controllers/authController');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// OTP Verification route
router.post('/verify', verifyOTP);  // New OTP verification route

// Route to get user details (protected route)
router.get('/user', auth, getUser);


// Route to update user details (protected route)
router.put('/update', updateUser);

module.exports = router;
