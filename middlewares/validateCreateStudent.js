const validator = require('../helpers/validator'); // call helper

const validateCreateStudent = (req, res, next) => {
  const rules = {
    name: 'required|string',
    lastName: 'required|string',
    gender: 'required|in:male,female,other',
    dateOfBirth: 'required|date',
    email: 'required|email',
    password: 'required|min:6',
    githubId: 'string',
    profilePicture: 'url',
    phoneNumber: 'string',
    'courses.*': 'string',
    'clubs.*': 'string',
  };

  const messages = {
    required: 'The :attribute field is required.',
    'gender.in': 'Gender must be male, female, or other.',
    'email.email': 'The email format is invalid.',
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

module.exports = validateCreateStudent;
