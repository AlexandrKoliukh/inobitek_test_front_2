import React from 'react';
import NodeFormFields from '../NodeFormFileds/NodeFormFields';
import Modal from '../Modal/Modal';

const AddNodeModal = (props) => {
  const { modalState, selectedNode, ...restProps } = props;
  if (!modalState.open || modalState.data !== 'add') return null;

  const view = (
    <div className="modal-container">
      <h2 id="simple-modal-title">
        {`Add node to "${selectedNode.name || 'root'}"`}
      </h2>
      <hr/>
      <NodeFormFields {...restProps} type="Add"/>
    </div>
  );

  return <Modal data={view} modalState={modalState}/>
};

export default AddNodeModal;
