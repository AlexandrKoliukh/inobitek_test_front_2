import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../../actions';
import NodeFormFields from '../NodeFormFileds/NodeFormFields';
import validate from '../../validators/validate';

const actionCreators = {
  updateNode: actions.updateNode,
  closeModal: actions.closeModal,
  unsetSelectedNode: actions.unsetSelectedNode,
};

class EditNodeForm extends React.Component {

  handleSubmit = async (form) => {
    const { updateNode, selectedNode, closeModal, unsetSelectedNode } = this.props;
    return await new Promise(async (resolve, reject) => {
      try {
        await updateNode({ ...form, id: selectedNode.id, parentId: selectedNode.parent_id });
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
    const { handleSubmit, submitting, closeModal, error, invalid } = this.props;

    const renderForm = () => (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <NodeFormFields/>
        {error && (
          <div>
            <strong className="danger-message">{error.message}</strong>
            <p>{error.response && 'Message: Node with same data exist'}</p>
          </div>
        )}

        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={submitting || invalid}>
            {submitting && <i className="fa fa-spinner"/>}
            Update
          </button>
          <button className="btn btn-danger" onClick={() => closeModal()} disabled={submitting}>
            Cancel
          </button>
        </div>
      </form>
    );

    return renderForm();
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
