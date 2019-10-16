import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../../actions';
import validate from '../../validators/validate';
import { EditNodeForm } from '../../components/forms/';
import selectedNodeSelector from '../../selectors/getSelectedNodeProps';

class EditFormContainer extends React.Component {

  handleSubmit = (form) => {
    const { updateNode, selectedNode, setNodeSelected, closeForm } = this.props;
    const newNode = { ...form, id: selectedNode.id, parentId: selectedNode.parent_id };
    return updateNode(newNode)
      .then(() => {
        setNodeSelected(newNode.id);
        closeForm();
      })
      .catch((_error) => {
        throw new SubmissionError({ _error });
      });
  };

  onCloseForm = (e) => {
    const { closeForm } = this.props;
    e.persist();
    closeForm();
  };

  render() {
    const { formState, handleSubmit } = this.props;
    if (formState.data !== 'edit') return null;

    return (
      <EditNodeForm
        onSubmit={handleSubmit(this.handleSubmit)}
        onCloseForm={this.onCloseForm}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { nodes } = state;
  const selectedNode = selectedNodeSelector(state);
  const { name, ip, port } = selectedNode;
  return {
    nodeUpdateState: state.nodeUpdateState,
    selectedNode,
    editFormState: state.editFormState,
    initialValues: { name, ip, port },
    formState: state.formState,
    nodes,
  }
};

const actionCreators = {
  updateNode: actions.updateNode,
  unsetSelectedNode: actions.unsetSelectedNode,
  closeForm: actions.closeForm,
  setNodeSelected: actions.setNodeSelected,
};

const initFormState = reduxForm({
  form: 'editNodeForm',
  validate,
  enableReinitialize: true,
})(EditFormContainer);

export default connect(mapStateToProps, actionCreators)(initFormState);
