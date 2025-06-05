const express = require('express');

const router = express.Router();

// Main app routes
router.use('/student', require('./students'));
router.use('/course', require('./courses'));
//router.use('/club', require('./clubs')); //for week 06
//router.use('/room', require('./rooms'));//for week 06

module.exports = router;
