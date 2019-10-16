import React from 'react';
import { Field } from 'redux-form';
import { ip, name, port } from '../../validators/normalizeFields';

const renderField = ({ input, label, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type="text" className="form-control" required maxLength="15"/>
      {touched && (error && <span className="danger-message">{error}</span>)}
    </div>
  </div>
);

const EditNodeForm = (props) => {
  const {
    error, invalid, submitting, onSubmit, onCloseForm
  } = props;

  return (
    <form onSubmit={onSubmit} className="border border-primary rounded p-2">
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
        <button type="submit" className="btn btn-primary" disabled={submitting || invalid}>
          {submitting && <i className="fa fa-spinner"/>}
          Update
        </button>
        <button type="button"
                className="btn btn-secondary"
                disabled={submitting}
                onClick={onCloseForm}
        >
          Cancel
        </button>
    </form>
  );
};

export default EditNodeForm;
