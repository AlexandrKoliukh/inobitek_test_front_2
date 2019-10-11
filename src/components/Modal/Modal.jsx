import React from 'react';
import SimpleModal from '@material-ui/core/Modal';

import './modal.css';

const Modal = (props) => {
  const {
    modalState: { open }, data
  } = props;

  return (
    <SimpleModal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      className="modal-main"
    >
      {data}
    </SimpleModal>
  )
};

export default Modal;