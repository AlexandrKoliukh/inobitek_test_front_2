import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Header extends React.Component {

  render() {
    const {
      selectedNode,
      openModal,
      fetchNodes,
      unsetSelectedNode,
      nodes,
    } = this.props;

    const buttonProps = selectedNode.id ? {} : {
      disabled: 'disabled',
      'data-toggle': 'tooltip',
      'data-placement': 'bottom',
      title: 'Select node',
    };

    return (
      <div onClick={() => unsetSelectedNode()}>
        <button className="btn btn-light" onClick={() => fetchNodes(0)} disabled={nodes.length !== 0}>
          <i className="fa fa-angle-down"/>
          View tree
        </button>
        <button type="button"
                className="btn btn-success"
                disabled={nodes.length === 0}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({ data: 'add' })
                }}
        >
          Add
        </button>
        <button type="button"
                className="btn btn-secondary"
                {...buttonProps}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({ data: 'edit' })
                }}
        >
          Edit
        </button>
        <button type="button"
                className="btn btn-danger"
                {...buttonProps}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal({ data: 'delete' })
                }}
        >
          Delete
        </button>
        <hr/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    selectedNode: state.selectedNode,
    nodes: state.nodes,
  }
};

const actionCreators = {
  openModal: actions.openModal,
  closeModal: actions.closeModal,
  fetchNodes: actions.fetchNodes,
  unsetSelectedNode: actions.unsetSelectedNode,
};

export default connect(mapStateToProps, actionCreators)(Header);