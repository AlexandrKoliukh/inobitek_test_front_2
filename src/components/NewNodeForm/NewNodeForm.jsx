import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../../actions';
import validate from '../../validators/validate';
import NodeFormFields from '../NodeFormFileds/NodeFormFields';

const actionCreators = {
  addNode: actions.addNode,
  closeModal: actions.closeModal,
};

class NewNodeForm extends React.Component {

  handleSubmit = (values) => {
    const { addNode, selectedNode, reset } = this.props;
    const parentId = selectedNode ? selectedNode.id : 0;
    return addNode({...values, parentId})
      .then(() => reset())
      .catch((_error) => {
        throw new SubmissionError({_error});
      });
  };

  render() {
    const { handleSubmit, submitting, closeModal, error, submitSucceeded, invalid } = this.props;

    const renderForm = () => (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <NodeFormFields/>
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
            Submit
          </button>
          <button className="btn btn-danger" onClick={() => closeModal()} disabled={submitting}>
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
  validate,
})(NewNodeForm);

export default connect(mapStateToProps, actionCreators)(initFormState);
