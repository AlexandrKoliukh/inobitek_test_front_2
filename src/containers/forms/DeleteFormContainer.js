import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { getChildrenIdsWide } from '../../utils/aroundTree';
import treeNodesSelector from '../../selectors/makeTree';
import { reduxForm, SubmissionError } from 'redux-form';
import DeleteNodeForm from '../../components/forms/DeleteNodeForm';

class DeleteFormContainer extends React.Component {
  onRemove = () => {
    const {
      removeNode, selectedNode, closeForm, unsetSelectedNode, nodes,
    } = this.props;
    const childrenIds = getChildrenIdsWide(selectedNode.id, nodes);
    return removeNode(selectedNode, childrenIds)
      .then(() => {
        closeForm();
        unsetSelectedNode();
      })
      .catch((_error) => {
        throw new SubmissionError({ _error });
      });
  };

  render() {
    const {
      closeForm, handleSubmit, submitting, selectedNode, formState
    } = this.props;

    if (formState.data !== 'delete') return null;

    return (
      <DeleteNodeForm
        closeForm={closeForm}
        submitting={submitting}
        selectedNode={selectedNode}
        onSubmit={handleSubmit(this.onRemove)}
        formState={formState}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedNode: state.selectedNode,
    nodes: treeNodesSelector(state),
    formState: state.formState,
  }
};

const actionCreators = {
  closeForm: actions.closeForm,
  removeNode: actions.removeNode,
  unsetSelectedNode: actions.unsetSelectedNode,
};

const initFormState = reduxForm({
  form: 'deleteNodeDialog',
})(DeleteFormContainer);

export default connect(mapStateToProps, actionCreators)(initFormState);
