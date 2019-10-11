import React from 'react';
import { connect } from 'react-redux';
import SimpleModal from '@material-ui/core/Modal';
import * as actions from '../../actions';
import EditNodeForm from '../../containers/forms/EditNodeForm';
import NewNodeForm from '../../containers/forms/NewNodeForm';
import DeleteNodeDialog from '../../containers/forms/DeleteNodeDialog';

import './modal.css';

const getModalState = (selectedNode, data) => {
  switch (data) {
    case 'add': return {
      header: `Add node to "${selectedNode.name || 'root'}"`,
      body: <NewNodeForm/>,
    };
    case 'edit': return {
      header: `Edit node "${selectedNode.name}"`,
      body: <EditNodeForm/>,
    };
    case 'delete': return {
      header: `Remove node "${selectedNode.name}"?`,
      body: <DeleteNodeDialog/>,
    };
    default: return {
      header: '',
      body: '',
    }

  }
};

class Modal extends React.Component {

  render() {
    const {
      modalState: { open, data },
      closeModal,
      selectedNode,
    } = this.props;

    const modalState = getModalState(selectedNode, data);
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
            {modalState.header}
          </h2>
          <hr/>
          {modalState.body}
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
