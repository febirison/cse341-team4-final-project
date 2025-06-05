const express = require('express');

const router = express.Router();
const Course = require('../models/Course');

// GET /courses - Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching courses', error: error.message });
  }
});

// GET /courses/:id - Get a single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching course', error: error.message });
  }
});

// POST /courses - Create a course
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Invalid course data', error: error.message });
  }
});

// PUT /courses/:id - Update a course
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating course', error: error.message });
  }
});

// DELETE /courses/:id - Delete a course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting course', error: error.message });
  }
});

module.exports = router;
