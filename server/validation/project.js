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
  let errors = {};
  // Convert empty fidlds to an empty string
  data.ownerId = !isEmpty(data.ownerId) ? data.ownerId : "";

  //OwnerId checks
  if (Validator.isEmpty(data.ownerId)) {
    errors.ownerId = "OwnerId field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

exports.validateAcceptInput = (data) => {
  let errors = {};
  // Convert empty fields to an empty string
  data.ownerId = !isEmpty(data.ownerId) ? data.ownerId : "";
  data.projectId = !isEmpty(data.projectId) ? data.projectId : "";
  data.applicantId = !isEmpty(data.applicantId) ? data.applicantId : "";

  //OwnerId checks
  if (Validator.isEmpty(data.ownerId)) {
    errors.ownerId = "OwnerId field is required";
  }
  //ProjectID checks
  if (Validator.isEmpty(data.projectId)) {
    errors.projectId = "ProjectId field is required";
  }
  //ApplicantId checks
  if (Validator.isEmpty(data.applicantId)) {
    errors.applicantId = "ApplicantId field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }; 
}