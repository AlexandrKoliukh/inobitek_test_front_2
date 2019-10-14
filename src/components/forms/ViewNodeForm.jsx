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

const ViewNodeForm = (props) => {
  const {
    onSubmit,
    selectedNode,
    onClick,
  } = props;

  return (
    <form onSubmit={onSubmit}>
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
      <div className="form-group">
        <button type="button"
                disabled={!selectedNode.id}
                className="btn btn-info"
                onClick={onClick('edit')}
        >
          Change
        </button>
      </div>
    </form>
  );
};

export default ViewNodeForm;
