const express = require('express');

const router = express.Router();
const Student = require('../models/Student');

// GET /students - Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching students', error: error.message });
  }
});

// GET /students/:id - Get a single student
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching student', error: error.message });
  }
});

// POST /students - Create a student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Invalid student data', error: error.message });
  }
});

// PUT /students/:id - Update a student
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating student', error: error.message });
  }
});

// DELETE /students/:id - Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting student', error: error.message });
  }
});

module.exports = router;
