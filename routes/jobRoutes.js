const express = require('express');
const router = express.Router();
const { createJob } = require('../controllers/jobController');
const auth = require('../middleware/authMiddleware');

// Route to create a new job (with email automation)
router.post('/', auth, createJob);

module.exports = router;
