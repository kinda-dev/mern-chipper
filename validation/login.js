// validations for user login
// to make sure that the user is passing enough inbfo to be validated
// in this case password and email
const Validator = require('validator');
const validText = require('./valid-text');

// data object is the data the user is sending when tries to login
module.exports = function validateLoginInput(data) {
  let errors = {};

  // make sure that email and password exist in the data object
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';

  // this checks using the validator library if the email is actually in email
  // format
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  // returns true if the errors array is empty
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};