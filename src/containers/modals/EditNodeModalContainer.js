import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../../actions';
import validate from '../../validators/validate';
import EditNodeModal from '../../components/EditNodeModal/EditNodeModal';

class EditNodeModalContainer extends React.Component {

  handleSubmit = (form) => {
    const { updateNode, selectedNode, closeModal, unsetSelectedNode } = this.props;
    return updateNode({ ...form, id: selectedNode.id, parentId: selectedNode.parent_id })
      .then(() => {
        closeModal();
        unsetSelectedNode();
      })
      .catch((_error) => {
        throw new SubmissionError({ _error });
      });
  };

  render() {
    const {
      handleSubmit, submitting, closeModal, error, invalid, modalState, selectedNode
    } = this.props;
    return (
      <EditNodeModal
        error={error}
        invalid={invalid}
        submitting={submitting}
        closeModal={closeModal}
        handleSubmit={handleSubmit(this.handleSubmit)}
        modalState={modalState}
        selectedNode={selectedNode}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { selectedNode } = state;
  const { name, ip, port } = selectedNode;
  return {
    nodeUpdateState: state.nodeUpdateState,
    selectedNode,
    editFormState: state.editFormState,
    initialValues: { name, ip, port },
    modalState: state.modalState,
  }
};

const actionCreators = {
  updateNode: actions.updateNode,
  closeModal: actions.closeModal,
  unsetSelectedNode: actions.unsetSelectedNode,
};

const initFormState = reduxForm({
  form: 'editNodeForm',
  validate,
  enableReinitialize: true,
})(EditNodeModalContainer);

export default connect(mapStateToProps, actionCreators)(initFormState);
