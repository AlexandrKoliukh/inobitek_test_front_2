import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../../actions';
import validate from '../../validators/validate';
import AddNodeForm from '../../components/forms/AddNodeForm';
import selectedNodeSelector from '../../selectors/getSelectedNodeProps';

class AddFormContainer extends React.Component {
  handleSubmit = (values) => {
    const { addNode, selectedNode, closeForm, reset } = this.props;
    const parentId = selectedNode.id || 0;
    return addNode({ ...values, parentId })
      .then(() => {
        reset();
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
    const {
      handleSubmit, submitting, error, submitSucceeded, invalid, selectedNode, formState
    } = this.props;

    if (formState.data !== 'add') return null;

    return (
      <AddNodeForm
        error={error}
        submitSucceeded={submitSucceeded}
        invalid={invalid}
        submitting={submitting}
        onCloseForm={this.onCloseForm}
        onSubmit={handleSubmit(this.handleSubmit)}
        selectedNode={selectedNode}
        formState={formState}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedNode: selectedNodeSelector(state),
    formState: state.formState,
  }
};

const actionCreators = {
  addNode: actions.addNode,
  closeForm: actions.closeForm,
};

const initFormState = reduxForm({
  form: 'newNodeForm',
  validate,
})(AddFormContainer);

export default connect(mapStateToProps, actionCreators)(initFormState);
