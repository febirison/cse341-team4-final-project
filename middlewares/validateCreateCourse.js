const validator = require('../helpers/validator');

const validateCreateCourse = (req, res, next) => {
  const rules = {
    title: 'required|string',
    description: 'required|string',
    instructor: 'required|string',
    rooms: 'required|string',
    'students.*': 'string',
  };

  const messages = {
    required: 'The :attribute field is required.',
    'instructor.string': 'Instructor must be a valid ID string.',
    'rooms.string': 'Room must be a valid ID string.',
  };

  validator(req.body, rules, messages, (err, status) => {
    if (!status) {
      return res.status(422).json({ errors: err.errors });
    }
    next();
  });
};

module.exports = validateCreateCourse;
