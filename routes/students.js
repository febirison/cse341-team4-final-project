const express = require('express');

const router = express.Router();
const validateCreateStudent = require('../middlewares/validateCreateStudent');
const validateUpdateStudent = require('../middlewares/validateUpdateStudent');
const studentController = require('../controllers/studentController');
const {
  isAuthenticated,
  isProfileComplete,
} = require('../middlewares/auth.middleware');

// GET all students
router.get('/', studentController.getAll);

// GET a single student by ID
router.get('/:id', studentController.getSingle);

// POST a new Student
router.post(
  '/',
  isAuthenticated,
  validateCreateStudent,
  isProfileComplete,
  studentController.createStudent,
);

// PUT update a Student by ID
router.put(
  '/:id',
  isAuthenticated,
  validateUpdateStudent,
  isProfileComplete,
  studentController.updateStudent,
);

// DELETE a Student by ID
router.delete(
  '/:id',
  isAuthenticated,
  isProfileComplete,
  studentController.deleteStudent,
);

module.exports = router;
