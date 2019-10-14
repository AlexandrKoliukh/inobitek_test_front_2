import React from 'react';

const DeleteNodeForm = (props) => {
  const {
    submitting, onSubmit, selectedNode, closeForm
  } = props;

  return (
    <form onSubmit={onSubmit} className="border border-danger rounded p-2">
      <h2>{`Remove node "${selectedNode.name}"?`}</h2>
      <hr/>
      <p>Nested elements will deleted too</p>
      <div className="form-group">
        <button type="submit" className="btn btn-danger" disabled={submitting}>
          {submitting && <i className="fa fa-spinner"/>}
          Delete
        </button>
        <button type="button"
                className="btn btn-secondary"
                disabled={submitting}
                onClick={closeForm}
        >
          Close
        </button>
      </div>
    </form>
  );

};

export default DeleteNodeForm;
