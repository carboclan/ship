import { isEmpty as _isEmpty, isEmail } from 'validator';
import isEmpty from 'is-empty';

export default function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (_isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (_isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};