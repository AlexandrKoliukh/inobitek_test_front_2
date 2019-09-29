import React from 'react';
import { Field } from 'redux-form';
import { ip, name, port } from '../../validators/normalizeFields';

const renderField = ({ input, label, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type="text" className="form-control" required/>
      {touched && (error && <span className="danger-message">{error}</span>)}
    </div>
  </div>
);

const NodeForm = () => {
  const renderForm = () => (
    <>
      <div className="form-group">
        <div>
          <Field name="name"
                 label="Name"
                 component={renderField}
                 maxLength="15"
                 normalize={name}
          />
        </div>
      </div>
      <div className="form-group">
        <div>
          <Field name="ip"
                 label="Ip"
                 component={renderField}
                 maxLength="15"
                 normalize={ip}
          />
        </div>
      </div>
      <div className="form-group">
        <div>
          <Field name="port"
                 label="Port"
                 component={renderField}
                 maxLength="5"
                 normalize={port}
          />
        </div>
      </div>
    </>
  );

  return renderForm();
};

export default NodeForm;
