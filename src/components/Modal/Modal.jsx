import React from 'react';
import { connect } from 'react-redux';
import SimpleModal from '@material-ui/core/Modal';
import * as actions from '../../actions';
import EditNodeForm from '../EditNodeForm';

import './modal.css';

class Modal extends React.Component {

  render() {
    const { modalState: { open, data },
      closeModal,
      selectedNode,
    } = this.props;

    return (
      <SimpleModal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => closeModal()}
        className="modal-main"
      >
        <div className="modal-container">
          <h2 id="simple-modal-title">
            {data === 'add' ?
              `Add node to "${selectedNode.name}"` :
              `Edit node "${selectedNode.name}"`}
          </h2>
          <hr/>
          <EditNodeForm/>
        </div>
      </SimpleModal>
    )
  };
}

const mapStateToProps = (state) => {
  const { modalState, selectedNode } = state;

  return {
    modalState,
    selectedNode,
  }
};

const actionCreators = {
  closeModal: actions.closeModal,
};

export default connect(mapStateToProps, actionCreators)(Modal);
