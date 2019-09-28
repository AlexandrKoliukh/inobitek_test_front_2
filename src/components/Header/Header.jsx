import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Header extends React.Component {

  render() {
    const {
      selectedNode,
      fetchNodes,
      openModal,
    } = this.props;

    const buttonProps = selectedNode.id ? {} : {
      disabled: 'disabled',
      'data-toggle': 'tooltip',
      'data-placement': 'bottom',
      title: 'Select node',
    };

    return (
      <>
        <div>
          <button type="button" className="btn btn-light" onClick={() => fetchNodes(0)}>
            <i className="fa fa-angle-down"/>
            Root
          </button>
          <button type="button"
                  className="btn btn-secondary"
                  {...buttonProps}
                  onClick={() => openModal({ data: 'edit' })}
          >
            Edit
          </button>
          <button type="button"
                  className="btn btn-success"
                  {...buttonProps}
                  onClick={() => openModal({ data: 'add' })}
          >
            Add
          </button>
          <button type="button"
                  className="btn btn-danger"
                  {...buttonProps}
                  onClick={() => openModal({ data: 'delete' })}
          >
            Delete
          </button>
        </div>
        <hr/>
      </>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    selectedNode: state.selectedNode,
  }
};

const actionCreators = {
  openModal: actions.openModal,
  closeModal: actions.closeModal,
  fetchNodes: actions.fetchNodes,
};

export default connect(mapStateToProps, actionCreators)(Header);
