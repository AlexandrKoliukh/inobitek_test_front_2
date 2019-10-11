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

const NodeFormFields = (props) => {
  const {
    submitSucceeded, error, closeModal, invalid, type, submitting, handleSubmit
  } = props;

  const renderFields = () => (
    <>
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
    </>
  );

  const buttonType = `btn btn-${type === 'Delete' ? 'danger' : 'primary'}`;

  return (
    <form onSubmit={handleSubmit}>
      {type === 'Delete'
        ? <p>Nested elements will deleted too</p>
        : renderFields()
      }
      {error && (
        <div>
          <strong className="danger-message">{error.message}</strong>
        </div>
      )}
      {submitSucceeded && (
        <p>
          <strong className="success-message">Success!</strong>
        </p>
      )}
      <div className="form-group">
        <button type="submit" className={buttonType} disabled={submitting || invalid}>
          {submitting && <i className="fa fa-spinner"/>}
          {type}
        </button>
        <button className="btn btn-secondary" onClick={() => closeModal()} disabled={submitting}>
          Close
        </button>
      </div>
    </form>
  );
};

export default NodeFormFields;
