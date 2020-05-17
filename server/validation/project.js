import { isEmpty as _isEmpty} from 'validator';
import isEmpty from 'is-empty';

export default function validateApplicationInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.userId = !isEmpty(data.userId) ? data.userId : "";
  data.projectId = !isEmpty(data.projectId) ? data.projectId : "";
// UserId checks
  if (_isEmpty(data.userId)) {
    errors.name = "UserId field is required";
  }
// ProjectId checks
  if (_isEmpty(data.projectId)) {
    errors.projectId = "ProjectId field is required";
  }
  return {
      errors,
      isValid: isEmpty(errors)
  };
};

export default function validateListProjectInput(data) {
  let errors = {}
// Convert empty filds to an empty string
   data.ownerId = !isEmpty(data.ownerId) ? data.ownerId : "";

   //ProjectID checks
   if (_isEmpty(data.ownerId)) {
     errors.ownerId = "ProjectId field is required";
   }
   return {
     errors,
     isValid: isEmpty(errors)
   };
};
