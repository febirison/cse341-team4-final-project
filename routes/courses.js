const express = require('express');

const router = express.Router();
const validateCreateCourse = require('../middlewares/validateCreateCourse');
const validateUpdateCourse = require('../middlewares/validateUpdateCourse');
const courseController = require('../controllers/courseController');

// GET all Courses
router.get('/', courseController.getAllCourses);

// GET a single Course by ID
router.get('/:id', courseController.getCourseById);

// POST a new Course
router.post('/', validateCreateCourse, courseController.createCourse);

// PUT update a Course by ID
router.put('/:id', validateUpdateCourse, courseController.updateCourse);

// DELETE a Course by ID
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
