import React from 'react';

const Header = (props) => {
  const {
    fetchNodes,
    unsetSelectedNode,
    nodes,
    nodesFetchingState,
    isRequestingState,
    selectedNode,
    handleClick,
  } = props;

  const buttonProps = selectedNode.id && !isRequestingState
    ? {
      disabled: nodesFetchingState === 'failed',
    }
    : {
      disabled: 'disabled',
      'data-toggle': 'tooltip',
      'data-placement': 'bottom',
      title: 'Select node',
    };

  return (
    <div onClick={() => unsetSelectedNode()} className="sticky-top">
      <button className="btn btn-light" onClick={() => fetchNodes(0)}
              disabled={nodes.length !== 0}>
        <i className="fa fa-angle-down"/>
        View tree
      </button>
      <button type="button"
              className="btn btn-success"
              disabled={isRequestingState || nodesFetchingState === 'failed'}
              onClick={handleClick('add')}>
        Add
      </button>
      <button type="button"
              className="btn btn-secondary"
              {...buttonProps}
              onClick={handleClick('edit')}>
        Edit
      </button>
      <button type="button"
              className="btn btn-danger"
              {...buttonProps}
              onClick={handleClick('delete')}>
        Delete
      </button>
      <hr/>
    </div>
  );
};

export default Header;
