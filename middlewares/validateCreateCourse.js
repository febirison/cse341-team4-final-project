const validator = require('../helpers/validator');

const validateCreateCourse = (req, res, next) => {
  const rules = {
    title: 'required|string',
    description: 'required|string',
    instructor: 'required|string',
    'students.*': 'string',
  };

  const messages = {
    required: 'The :attribute field is required.',
    'instructor.string': 'Instructor must be a valid ID string.',
    'students.*.string': 'Each student ID must be a valid string.',
  };

  validator(req.body, rules, messages, (err, status) => {
    if (!status) {
      return res.status(400).json({ errors: err.errors });
    }
    next();
  });
};

module.exports = validateCreateCourse;
