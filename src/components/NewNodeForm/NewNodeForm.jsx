import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../../actions';

// import { ip, name, port } from '../../validators/validation';

const actionCreators = {
  addNode: actions.addNode,
  closeModal: actions.closeModal,
};

class NewNodeForm extends React.Component {

  handleSubmit = (values) => {
    const { addNode, selectedNode, reset } = this.props;
    const parentId = selectedNode ? selectedNode.id : 0;
    return new Promise(async (resolve, reject) => {
      try {
        await addNode({ ...values, parentId });
        await resolve(true);
      } catch (e) {
        reject(e);
      }
    }).then(() => reset())
  };


  render() {
    const { handleSubmit, submitting, closeModal, submitFailed } = this.props;

    console.log(this.props);

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
        {submitFailed && <div><strong>Error</strong></div>}
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            Submit
          </button>
          <button className="btn btn-danger" onClick={() => closeModal()}>
            Close
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
