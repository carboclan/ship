const Validator = require("validator");
const Joi = require("@hapi/joi");
const isEmpty = require("is-empty");

const mongoObjectIdSchema = Joi.string().alphanum().length(24);

const contributorSlotSchema = Joi.object({
  requirements: Joi.string().required(),
  responsibilities: Joi.string().required(),
  equity: Joi.string().required(),
});

const createProjectInputSchema = Joi.object({
  ownerId: mongoObjectIdSchema.required(),
  name: Joi.string().required(),
  productVersion: Joi.string().required(),
  specification: Joi.string().required(),
  objectives: Joi.string().required(),
  contributorSlots: Joi.array()
    .items(contributorSlotSchema.required())
    .required(),
  strikePrice: Joi.number().integer().positive().required(),
  shippingDuration: Joi.number().integer().positive().required(), // seconds
  exerciseableDuration: Joi.number().integer().positive().required(), // seconds
});

exports.validateCreateProjectInput = (data) => {
  const { error } = createProjectInputSchema.validate(data);
  return error
    ? { errors: { joi: error }, isValid: false }
    : {
        errors: {},
        isValid: true,
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
    isValid: isEmpty(errors),
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
    isValid: isEmpty(errors),
  };
};
