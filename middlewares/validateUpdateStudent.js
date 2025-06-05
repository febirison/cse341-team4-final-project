const validator = require('../helpers/validator');

const validateUpdateStudent = (req, res, next) => {
  const rules = {
    name: 'string',
    lastName: 'string',
    gender: 'in:male,female,other',
    dateOfBirth: 'date',
    email: 'email',
    password: 'min:6',
    githubId: 'string',
    profilePicture: 'url',
    phoneNumber: 'string',
    'courses.*': 'string',
    'clubs.*': 'string',
  };

  const messages = {
    'gender.in': 'Gender must be male, female, or other.',
    'email.email': 'Must be a valid email.',
    'dateOfBirth.date': 'Date of birth must be a valid date.',
    'password.min': 'Password must be at least 6 characters.',
    'profilePicture.url': 'Profile picture must be a valid URL.',
  };

  validator(req.body, rules, messages, (err, status) => {
    if (!status) {
      return res.status(422).json({ errors: err.errors });
    }
    next();
  });
};

module.exports = validateUpdateStudent;
