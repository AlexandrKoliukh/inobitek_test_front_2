import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

// import { ip, name, port } from '../../validators/validation';

const actionCreators = {
  addNode: actions.addNode,
  closeModal: actions.closeModal,
};

class NewNodeForm extends React.Component {

  handleSubmit = (form) => {
    const { addNode, selectedNode, closeModal } = this.props;
    addNode({ ...form, parentId: selectedNode.id });
    closeModal();
  };

  render() {
    const { handleSubmit, submitting, closeModal } = this.props;

    const renderForm = () => (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <div>
            <Field name="name"
                   required
                   component="input"
                   type="text"
                   maxLength="30"
                   className="form-control"
              // normalize={name}
            />
          </div>
        </div>
        <div className="form-group">
          <label>IP</label>
          <div>
            <Field name="ip"
                   required
                   component="input"
                   type="text"
                   maxLength="15"
                   className="form-control"
              // normalize={ip}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Port</label>
          <div>
            <Field name="port"
                   required
                   component="input"
                   type="text"
                   maxLength="10"
                   className="form-control"
              // normalize={port}
            />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            Submit
          </button>
          <button className="btn btn-danger" onClick={() => closeModal()}>
            Cancel
          </button>
        </div>
      </form>
    );

    return renderForm();
  }
}

const mapStateToProps = (state) => {
  const { selectedNode } = state;
  return {
    selectedNode,
  }
};

const initFormState = reduxForm({
  form: 'newNodeForm',
})(NewNodeForm);

export default connect(mapStateToProps, actionCreators)(initFormState);
