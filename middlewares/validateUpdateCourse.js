const validator = require('../helpers/validator');

const validateUpdateCourse = (req, res, next) => {
  const rules = {
    title: 'string',
    description: 'string',
    instructor: 'string',
    rooms: 'string',
    'students.*': 'string',
  };

  const messages = {
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

module.exports = validateUpdateCourse;
