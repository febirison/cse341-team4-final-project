const express = require('express');

const router = express.Router();
const validateCreateStudent = require('../middlewares/validateCreateStudent');
const validateUpdateStudent = require('../middlewares/validateUpdateStudent');
const studentController = require('../controllers/studentController');
const ensureAuthenticated = require('../middlewares/authentication');

// GET all students
router.get('/', studentController.getAll);

// GET a single student by ID
router.get('/:id', studentController.getSingle);

// POST a new Student
router.post(
  '/',
  ensureAuthenticated,
  validateCreateStudent,
  studentController.createStudent,
);

// PUT update a Student by ID
router.put(
  '/:id',
  ensureAuthenticated,
  validateUpdateStudent,
  studentController.updateStudent,
);

// DELETE a Student by ID
router.delete('/:id', ensureAuthenticated, studentController.deleteStudent);

module.exports = router;
