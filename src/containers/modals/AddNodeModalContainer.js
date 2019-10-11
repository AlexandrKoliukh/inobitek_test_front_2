import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../../actions';
import validate from '../../validators/validate';
import AddNodeModal from '../../components/AddNodeModal/AddNodeModal';

class AddNodeModalContainer extends React.Component {
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
    const {
      handleSubmit, submitting, closeModal, error, submitSucceeded, invalid, selectedNode, modalState
    } = this.props;
    return (
      <AddNodeModal
        error={error}
        submitSucceeded={submitSucceeded}
        invalid={invalid}
        submitting={submitting}
        closeModal={closeModal}
        handleSubmit={handleSubmit(this.handleSubmit)}
        selectedNode={selectedNode}
        modalState={modalState}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedNode: state.selectedNode,
    modalState: state.modalState,
  }
};

const actionCreators = {
  addNode: actions.addNode,
  closeModal: actions.closeModal,
};

const initFormState = reduxForm({
  form: 'newNodeForm',
  validate,
})(AddNodeModalContainer);

export default connect(mapStateToProps, actionCreators)(initFormState);
