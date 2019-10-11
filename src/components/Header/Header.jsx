import React from 'react';

const Header = (props) => {
  const {
    unsetSelectedNode,
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
