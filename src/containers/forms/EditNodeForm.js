import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../../actions';
import NodeFormFields from '../../components/NodeFormFileds/NodeFormFields';
import validate from '../../validators/validate';

const actionCreators = {
  updateNode: actions.updateNode,
  closeModal: actions.closeModal,
  unsetSelectedNode: actions.unsetSelectedNode,
};

class EditNodeForm extends React.Component {

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
    const { handleSubmit, submitting, closeModal, error, invalid } = this.props;
    return (
      <NodeFormFields
        error={error}
        type={'Update'}
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
  const { name, ip, port } = selectedNode;
  return {
    nodeUpdateState: state.nodeUpdateState,
    selectedNode,
    editFormState: state.editFormState,
    initialValues: { name, ip, port },
  }
};

const initFormState = reduxForm({
  form: 'editNodeForm',
  validate,
  enableReinitialize: true,
})(EditNodeForm);

export default connect(mapStateToProps, actionCreators)(initFormState);
