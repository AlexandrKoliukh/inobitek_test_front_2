import React from 'react';
import { Field } from 'redux-form';
import { ip, name, port } from '../../validators/normalizeFields';

const renderField = ({ input, label, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type="text" disabled className="form-control" required maxLength="15"/>
      {touched && (error && <span className="danger-message">{error}</span>)}
    </div>
  </div>
);

const NodeFormFields = (props) => {
  const {
    submitSucceeded, error, invalid, type, submitting, handleSubmit
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <div>
          <Field name="name"
                 label="Name"
                 component={renderField}
                 normalize={name}
          />
        </div>
      </div>
      <div className="form-group">
        <div>
          <Field name="ip"
                 label="Ip"
                 component={renderField}
                 normalize={ip}
          />
        </div>
      </div>
      <div className="form-group">
        <div>
          <Field name="port"
                 label="Port"
                 component={renderField}
                 normalize={port}
          />
        </div>
      </div>

      {error && (
        <div>
          <strong className="danger-message">{error.message}</strong>
        </div>
      )}
      {submitSucceeded && (
        <p>
          <strong className="success-message">Added success!</strong>
        </p>
      )}

      <div className="form-group">
        <button type="submit" className="btn btn-primary" disabled={submitting || invalid}>
          {submitting && <i className="fa fa-spinner"/>}
          {type}
        </button>
      </div>
    </form>
  );
};

export default NodeFormFields;
