const express = require('express');

const router = express.Router();
const validateCreateCourse = require('../middlewares/validateCreateCourse');
const validateUpdateCourse = require('../middlewares/validateUpdateCourse');
const courseController = require('../controllers/courseController');
const ensureAuthenticated = require('../middlewares/authentication');

// GET all courses
router.get('/', courseController.getAll);

// GET a single course by ID
router.get('/:id', courseController.getSingle);

// POST a new Course
router.post(
  '/',
  ensureAuthenticated,
  validateCreateCourse,
  courseController.createCourse,
);

// PUT update a Course by ID
router.put(
  '/:id',
  ensureAuthenticated,
  validateUpdateCourse,
  courseController.updateCourse,
);

// DELETE a Course by ID
router.delete('/:id', ensureAuthenticated, courseController.deleteCourse);

module.exports = router;
