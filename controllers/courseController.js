const mongoose = require('mongoose');
const Course = require('../models/course');

// GET all courses
const getAll = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor').populate('enrolledStudents');
    console.log('Get all courses called');
    res.status(200).json(courses);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve courses.' });
  }
};

// GET a single course by ID
const getSingle = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor').populate('enrolledStudents');
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: 'Course not found.' });
    }
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
      courseId: course._id,
    });
  } catch {
    res.status(500).json({ error: 'Failed to create course.' });
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
      res.status(200).json({ message: 'Course updated successfully.' });
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
