import React from 'react';
import Modal from '../Modal/Modal';

const DeleteNodeModal = (props) => {
  const {
    closeModal, submitting, handleSubmit, selectedNode, modalState
  } = props;

  if (!modalState.open || modalState.data !== 'delete') return null;

  const header = `Remove node "${selectedNode.name}"?`;

  const body = (
    <form onSubmit={handleSubmit}>
      <p>Nested elements will deleted too</p>
      <div className="form-group">
        <button type="submit" className="btn btn-danger" disabled={submitting}>
          {submitting && <i className="fa fa-spinner"/>}
          Delete
        </button>
        <button className="btn btn-secondary" onClick={() => closeModal()} disabled={submitting}>
          Close
        </button>
      </div>
    </form>
  );

  const view = (
    <div className="modal-container">
      <h2 id="simple-modal-title">
        {header}
      </h2>
      <hr/>
      {body}
    </div>
  );

  return <Modal modalState={modalState} data={view}/>;

};

export default DeleteNodeModal;
