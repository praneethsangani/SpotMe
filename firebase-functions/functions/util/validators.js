const isEmail = (email) => {
  const emailRegEx = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(pitt)\.edu$/;
  return !!email.match(emailRegEx);
};

const isEmpty = (string) => {
  return string.trim() === '';
};

exports.validateSignUpData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = 'Must not be empty.';
  else if (!isEmail(data.email)) errors.email = 'Must be a valid Pitt email.';
  else if (isEmpty(data.name)) errors.name = 'Must not be empty.';

  if (isEmpty(data.password)) errors.password = 'Must not be empty.';
  if (data.password.length < 6) errors.password = 'Must be at least 6 characters.';
  if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match.';

  return {
    errors,
    valid: Object.keys(errors).length === 0
  }
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = 'Must not be empty.';
  else if (!isEmail(data.email)) errors.email = 'Must be a valid Pitt email.';

  if (isEmpty(data.password)) errors.password = 'Must not be empty.';

  return {
    errors,
    valid: Object.keys(errors).length === 0
  }
};

exports.reduceUserDetails = (data) => {
  let userDetails = {};

  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.gym.trim())) userDetails.gym = data.gym;

  return userDetails;
};
