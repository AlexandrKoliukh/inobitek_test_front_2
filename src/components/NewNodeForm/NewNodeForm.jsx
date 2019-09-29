import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../../actions';
import validate from '../../validators/validate';
import NodeForm from '../NodeForm/NodeForm';

const actionCreators = {
  addNode: actions.addNode,
  closeModal: actions.closeModal,
};

class NewNodeForm extends React.Component {

  handleSubmit = async (values) => {
    const { addNode, selectedNode, reset } = this.props;
    const parentId = selectedNode ? selectedNode.id : 0;
    return await new Promise(async (resolve, reject) => {
      try {
        await addNode({ ...values, parentId });
        await resolve(true);
        reset();
      } catch (e) {
        reject(new SubmissionError({
          _error: e,
        }));
      }
    });
  };

  render() {
    const { handleSubmit, submitting, closeModal, error, submitSucceeded, invalid } = this.props;

    console.log(this.props);

    const renderForm = () => (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <NodeForm/>
        {error && (
          <div>
            <strong className="danger-message">{error.message}</strong>
            <p>{error.response && 'Message: Node with same data exist'}</p>
          </div>
        )}

        {submitSucceeded && (
          <p>
            <strong className="success-message">Added success!</strong>
          </p>
        )}

        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={submitting || invalid}>
            {submitting && <i className="fa fa-spinner"/>}
            Submit
          </button>
          <button className="btn btn-danger" onClick={() => closeModal()} disabled={submitting}>
            Close
          </button>
        </div>
      </form>
    );

    return renderForm();
  }
}

const mapStateToProps = (state) => {
  const { selectedNode } = state;
  return {
    selectedNode,
  }
};

const initFormState = reduxForm({
  form: 'newNodeForm',
  validate,
})(NewNodeForm);

export default connect(mapStateToProps, actionCreators)(initFormState);
