const Validator = require('validator');
const isEmpty = require('is-empty');

exports.validateListProjectInput = (data) => {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.userId = !isEmpty(data.userId) ? data.userId : "";
  data.projectId = !isEmpty(data.projectId) ? data.projectId : "";
// UserId checks
  if (Validator.isEmpty(data.userId)) {
    errors.name = "UserId field is required";
  }
// ProjectId checks
  if (Validator.isEmpty(data.projectId)) {
    errors.projectId = "ProjectId field is required";
  }
  return {
      errors,
      isValid: isEmpty(errors)
  };
};

exports.validateListProjectInput = (data) => {
  let errors = {}
// Convert empty filds to an empty string
   data.ownerId = !isEmpty(data.ownerId) ? data.ownerId : "";

   //ProjectID checks
   if (Validator.isEmpty(data.ownerId)) {
     errors.ownerId = "ProjectId field is required";
   }
   return {
     errors,
     isValid: isEmpty(errors)
   };
};