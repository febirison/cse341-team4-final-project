const mongoose = require('mongoose');
const Course = require('../models/Course');

// GET all courses
const getAll = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('instructor')
      .populate('enrolledStudents');
    //console.log('Get all courses called');
    res.status(200).json(courses);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve courses.' });
  }
};

// Get a single course by ID
const getSingle = async (req, res) => {
  const { id } = req.params;

  // Checking id that ObjectId is corrected
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid course ID format' });
  }

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch {
    res
      .status(400)
      .json({ error: 'Invalid ID format or failed to retrieve course.' });
  }
};

// CREATE a new course
const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({
      message: 'Course created successfully.',
      course, // return object as the grader comment.
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to create course.', details: error.message });
  }
};

// UPDATE a course by ID
const updateCourse = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid course ID format.' });
  }

  try {
    const result = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (result) {
      res.status(200).json({
        message: 'Course updated successfully.',
        course: result, // return object as the grader comment.
      });
    } else {
      res.status(404).json({ message: 'Course not found.' });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res
        .status(400)
        .json({ error: 'Validation failed', details: err.errors });
    }
    res.status(500).json({ error: 'Failed to update course.' });
  }
};

// DELETE a course by ID
const deleteCourse = async (req, res) => {
  try {
    const result = await Course.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch {
    res.status(400).json({ error: 'Invalid ID format' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCourse,
  updateCourse,
  deleteCourse,
};
