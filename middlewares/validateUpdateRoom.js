const validator = require('../helpers/validator');

const validateUpdateRoom = (req, res, next) => {
  const rules = {
    buildingName: 'string',
    roomNumber: 'string',
    capacity: 'integer',
    'students.*': 'string',
  };

  const messages = {
    'capacity.integer': 'Capacity must be a valid number.',
  };

  const keys = Object.keys(req.body);

  if (keys.length === 0) {
    return res
      .status(400)
      .json({ errors: { message: 'No fields to update.' } });
  }

  validator(req.body, rules, messages, (err, status) => {
    if (!status) {
      return res.status(400).json({ errors: err.errors });
    }
    next();
  });
};

module.exports = validateUpdateRoom;
