const validator = require('../helpers/validator');

const validateUpdateCourse = (req, res, next) => {
  const rules = {
    title: 'string',
    description: 'string',
    instructor: 'string',
    'students.*': 'string',
  };

  const keys = Object.keys(req.body);
  if (keys.length === 0) {
    return res
      .status(400)
      .json({ errors: { message: 'No fields to update.' } });
  }
  const messages = {
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

module.exports = validateUpdateCourse;
