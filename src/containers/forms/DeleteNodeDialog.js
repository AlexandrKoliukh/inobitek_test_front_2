import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { getChildrenIdsWide } from '../../utils/aroundTree';
import treeNodesSelector from '../../selectors/makeTree';
import { reduxForm, SubmissionError } from 'redux-form';
import NodeFormFields from '../../components/NodeFormFileds/NodeFormFields';

class DeleteNodeDialog extends React.Component {
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
    const { closeModal, error, handleSubmit, submitting } = this.props;
    return (
      <NodeFormFields
        error={error}
        type={'Delete'}
        submitting={submitting}
        closeModal={closeModal}
        handleSubmit={handleSubmit(this.onRemove)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedNode: state.selectedNode,
    nodes: treeNodesSelector(state),
  }
};

const actionCreators = {
  closeModal: actions.closeModal,
  removeNode: actions.removeNode,
  unsetSelectedNode: actions.unsetSelectedNode,
};

const initFormState = reduxForm({
  form: 'deleteNodeDialog',
})(DeleteNodeDialog);

export default connect(mapStateToProps, actionCreators)(initFormState);
