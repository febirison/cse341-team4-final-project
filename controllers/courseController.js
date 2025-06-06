const Course = require('../models/Course');

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching courses', error: error.message });
  }
};

// Get a single course by ID
const getCourseById = async (req, res) => {
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
};

// Create a new course
const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({
      message: 'Course created successfully.',
      courseId: course._id,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Invalid course data', error: error.message });
  }
};

// Update an existing course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course updated successfully.' });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating course', error: error.message });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  try {
    const result = await Course.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch {
    res.status(400).json({ error: 'Invalid ID format' });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
