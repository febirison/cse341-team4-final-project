const validator = require('../helpers/validator');

const validateCreateRoom = (req, res, next) => {
  const rules = {
    buildingName: 'required|string',
    roomNumber: 'required|string',
    capacity: 'required|integer',
    'students.*': 'string',
  };

  const messages = {
    required: 'The :attribute field is required.',
    'capacity.integer': 'Capacity must be a valid number.',
  };

  validator(req.body, rules, messages, (err, status) => {
    if (!status) {
      return res.status(400).json({ errors: err.errors });
    }
    next();
  });
};

module.exports = validateCreateRoom;
