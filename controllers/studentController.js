const mongoose = require('mongoose');
const Student = require('../models/Student');

// GET all students
const getAll = async (req, res) => {
  try {
    const students = await Student.find();
    //console.log('Get all students called');
    res.status(200).json(students);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve students.' });
  }
};

// GET a single student by ID
const getSingle = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Student not found.' });
    }
  } catch {
    res
      .status(400)
      .json({ error: 'Invalid ID format or failed to retrieve student.' });
  }
};

/// CREATE a new student
const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({
      message: 'Student created successfully.',
      student,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to create student.', details: error.message });
  }
};

// UPDATE a student by ID
const updateStudent = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid student ID format.' });
  }

  try {
    const result = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (result) {
      res.status(200).json({
        message: 'Student updated successfully.',
        student: result, // return updated Student.
      });
    } else {
      res.status(404).json({ message: 'Student not found.' });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res
        .status(400)
        .json({ error: 'Validation failed', details: err.errors });
    }
    res.status(500).json({ error: 'Failed to update student.' });
  }
};

// DELETE a student by ID
const deleteStudent = async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).json({ message: 'Student deleted successfully.' }); // optional improvement
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Invalid ID format', details: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent,
};
