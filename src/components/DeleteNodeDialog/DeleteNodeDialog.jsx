import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { getChildrenIdsWide } from '../../utils/aroundTree';
import treeNodesSelector from '../../selectors/makeTree';
import { reduxForm, SubmissionError } from 'redux-form';

class DeleteNodeDialog extends React.Component {

  onRemove = async () => {
    const {
      removeNode,
      selectedNode,
      closeModal,
      unsetSelectedNode,
      nodes,
    } = this.props;

    const childrenIds = getChildrenIdsWide(selectedNode.id, nodes);
    return await new Promise(async (resolve, reject) => {
      try {
        await removeNode(selectedNode, childrenIds);
        await resolve(true);
        closeModal();
        unsetSelectedNode();
      } catch (e) {
        reject(new SubmissionError({
          _error: e,
        }));
      }
    });

  };

  render() {

    const { closeModal, error, handleSubmit, submitting } = this.props;

    return (
      <div>
        <p>Nested elements will deleted too</p>

        {error && <p><strong className="danger-message">{error.message}</strong></p>}

        <form onSubmit={handleSubmit(this.onRemove)}>
          <button type="submit" className="btn btn-danger" disabled={submitting}>
            Delete
          </button>
          <button onClick={() => closeModal()} className="btn btn-secondary">Cancel</button>
        </form>
      </div>
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
