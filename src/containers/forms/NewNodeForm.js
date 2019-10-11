import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../../actions';
import validate from '../../validators/validate';
import NodeFormFields from '../../components/NodeFormFileds/NodeFormFields';

const actionCreators = {
  addNode: actions.addNode,
  closeModal: actions.closeModal,
};

class NewNodeForm extends React.Component {
  handleSubmit = (values) => {
    const { addNode, selectedNode, reset } = this.props;
    const parentId = selectedNode ? selectedNode.id : 0;
    return addNode({ ...values, parentId })
      .then(() => reset())
      .catch((_error) => {
        throw new SubmissionError({ _error });
      });
  };

  render() {
    const { handleSubmit, submitting, closeModal, error, submitSucceeded, invalid } = this.props;
    return (
      <NodeFormFields
        error={error}
        submitSucceeded={submitSucceeded}
        type={'Add'}
        invalid={invalid}
        submitting={submitting}
        closeModal={closeModal}
        handleSubmit={handleSubmit(this.handleSubmit)}
      />
    );
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
