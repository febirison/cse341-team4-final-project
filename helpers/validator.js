const Validator = require('validatorjs');

// middleware validator
const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);

  validation.passes(() => callback(null, true)); // if passed
  validation.fails(() => callback(validation.errors, false)); // if not pass
};

module.exports = validator;
