import React from 'react';
import { connect } from 'react-redux';
import SimpleModal from '@material-ui/core/Modal';
import * as actions from '../../actions';
import EditNodeForm from '../EditNodeForm';
import NewNodeForm from '../NewNodeForm';
import DeleteNodeDialog from '../DeleteNodeDialog';

import './modal.css';

class Modal extends React.Component {

  render() {
    const { modalState: { open, data },
      closeModal,
      selectedNode,
    } = this.props;

    const modalStates = {
      add: {
        header: `Add node to "${selectedNode.name || 'Root'}"`,
        body: <NewNodeForm/>,
      },
      edit: {
        header: `Edit node "${selectedNode.name}"`,
        body: <EditNodeForm/>,
      },
      delete: {
        header: `Remove node "${selectedNode.name}"?`,
        body: <DeleteNodeDialog/>,
      },
      none: {
        header: '',
        body: '',
      }
    };

    const modalState = modalStates[data];
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
            {modalState.header || ''}
          </h2>
          <hr/>
          {modalState.body || ''}
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
