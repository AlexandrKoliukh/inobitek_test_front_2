import React from 'react';
import NodeFormFields from '../NodeFormFileds/NodeFormFields';
import Modal from '../Modal/Modal';

const EditNodeModal = (props) => {
  const { modalState, selectedNode, ...restProps } = props;
  if (!modalState.open || modalState.data !== 'edit') return null;

  const view = (
    <div className="modal-container">
      <h2 id="simple-modal-title">
        {`Edit node "${selectedNode.name}"`}
      </h2>
      <hr/>
      <NodeFormFields {...restProps} type="Update"/>
    </div>
  );

  return <Modal data={view} modalState={modalState}/>
};

export default EditNodeModal;
