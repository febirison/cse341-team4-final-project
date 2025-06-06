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
//router.use('/club', require('./clubs')); //for week 06
//router.use('/room', require('./rooms'));//for week 06

module.exports = router;
