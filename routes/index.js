const express = require('express');

const router = express.Router();

// Root route
router.get('/', (req, res) => {
  res.send('📘 Welcome to the Campus Coordinator API!');
});

// Main app routes
router.use('/auth', require('./auth'));
router.use('/student', require('./students'));
router.use('/course', require('./courses'));
router.use('/club', require('./clubs'));
router.use('/room', require('./rooms'));

module.exports = router;
