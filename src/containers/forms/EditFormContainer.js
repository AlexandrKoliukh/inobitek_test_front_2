import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../../actions';
import validate from '../../validators/validate';
import { EditNodeForm } from '../../components/forms/';

class EditFormContainer extends React.Component {

  handleSubmit = (form) => {
    const { updateNode, selectedNode, setNodeSelected } = this.props;
    const newNode = { ...form, id: selectedNode.id, parentId: selectedNode.parent_id };
    return updateNode(newNode)
      .then(() => {
        setNodeSelected(newNode);
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
    const { formState } = this.props;
    if (formState.data !== 'edit') return null;

    const {
      handleSubmit
    } = this.props;

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
  const { selectedNode } = state;
  const { name, ip, port } = selectedNode;
  return {
    nodeUpdateState: state.nodeUpdateState,
    selectedNode,
    editFormState: state.editFormState,
    initialValues: { name, ip, port },
    formState: state.formState,
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
