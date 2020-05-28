const Validator = require('validator');
const isEmpty = require('is-empty');

exports.validateCreateProjectInput = (data) => {
  let errors = {};
  // Convert empty fields to default value
  data.name = !isEmpty(data.name) ? data.name : "";
  data.productVersion = !isEmpty(data.productVersion) ? data.productVersion : "";
  data.specification = !isEmpty(data.specification) ? data.specification : "";
  data.objectives = !isEmpty(data.objectives) ? data.objectives : "";
  data.ownerId = !isEmpty(data.ownerId) ? data.ownerId : "";
  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }
  // productionVersion Checks
  if (Validator.isEmpty(data.productVersion)) {
    errors.productVersion = "productVersion field is required";
  }
  // specification checks
  if (Validator.isEmpty(data.specification)) {
    errors.specification = "specification field is required";
  }
  // OutcomeObjectives checks
  if (Validator.isEmpty(data.outcomeObjectives)) {
    errors.outcomeObjectives = "outcomeObjectives field is required"
  } 
  // ownerId checks
  if (Validator.isEmpty(data.ownerId)) {
    errors.ownerId = "ownerId field is required"
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

exports.validateApplyProjectInput = (data) => {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.userId = !isEmpty(data.userId) ? data.userId : "";
  data.projectId = !isEmpty(data.projectId) ? data.projectId : "";
// UserId checks
  if (Validator.isEmpty(data.userId)) {
    errors.userId = "UserId field is required";
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
  data.contributorId = !isEmpty(data.contributorId) ? data.contributorId : "";

  //OwnerId checks
  if (Validator.isEmpty(data.ownerId)) {
    errors.ownerId = "OwnerId field is required";
  }
  //ProjectID checks
  if (Validator.isEmpty(data.projectId)) {
    errors.projectId = "ProjectId field is required";
  }
  //ApplicantId checks
  if (Validator.isEmpty(data.contributorId)) {
    errors.contributorId = "ApplicantId field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }; 
}

exports.validateAcceptByIdInput = (data) => {
  let errors = {};
  // Convert empty fields to an empty string
  data.cacheId = !isEmpty(data.cacheId) ? data.cacheId : "";

  //CacheId checks
  if (Validator.isEmpty(data.cacheId)) {
    errors.cacheId = "CacheId field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }; 
}