const validate = values => {
  const errors = {};
  if (!values.name) {

  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less'
  }
  if (!/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/i.test(values.ip)) {
    errors.ip = 'Invalid ip address'
  }
  if (values.port < 1 || values.port > 65535) {
    errors.port = 'Must be in [1; 65 535]'
  }

  return errors;
};

export default validate;
