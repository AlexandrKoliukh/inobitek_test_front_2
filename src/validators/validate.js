const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }
  if (!values.ip) {
    errors.ip = 'Required';
  } else if (!/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i.test(values.ip)) {
    errors.ip = 'Invalid ip address';
  }
  if (!values.port) {
    errors.port = 'Required';
  } else if (values.port < 1 || values.port > 65535) {
    errors.port = 'Must be in [1; 65 535]';
  }

  return errors;
};

export default validate;
