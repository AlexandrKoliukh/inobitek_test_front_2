import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { getChildrenIdsWide } from '../../utils/aroundTree';
import treeNodesSelector from '../../selectors/makeTree';
import { reduxForm, SubmissionError } from 'redux-form';
import DeleteNodeModal from '../../components/DeleteNodeModal/DeleteNodeModal';

class DeleteNodeModalContainer extends React.Component {
  onRemove = () => {
    const {
      removeNode, selectedNode, closeModal, unsetSelectedNode, nodes,
    } = this.props;
    const childrenIds = getChildrenIdsWide(selectedNode.id, nodes);

    return removeNode(selectedNode, childrenIds)
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
      closeModal, handleSubmit, submitting, selectedNode, modalState
    } = this.props;
    return (
      <DeleteNodeModal
        closeModal={closeModal}
        submitting={submitting}
        selectedNode={selectedNode}
        handleSubmit={handleSubmit(this.onRemove)}
        modalState={modalState}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedNode: state.selectedNode,
    nodes: treeNodesSelector(state),
    modalState: state.modalState,
  }
};

const actionCreators = {
  closeModal: actions.closeModal,
  removeNode: actions.removeNode,
  unsetSelectedNode: actions.unsetSelectedNode,
};

const initFormState = reduxForm({
  form: 'deleteNodeDialog',
})(DeleteNodeModalContainer);

export default connect(mapStateToProps, actionCreators)(initFormState);
