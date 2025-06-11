const express = require('express');

const router = express.Router();

// Root route
router.get('/', (req, res) => {
  res.send('📘 Welcome to the Campus Coordinator API!');
});

// Main app routes
router.use('/student', require('./students'));
console.log('Get all students called');

router.use('/course', require('./courses'));
router.use('/club', require('./clubs'));
router.use('/room', require('./rooms'));

module.exports = router;
