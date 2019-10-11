import React from 'react';
import { connect } from 'react-redux';
import Loader from '../components/Loader/Loader';
import * as actions from '../actions';
import TreeItem from '../components/TreeItem/TreeItem';
import treeNodesSelector from '../selectors/makeTree';

import ErrorIndicator from '../components/ErrorIndicator';
import Header from '../components/Header/Header';

class AppContainer extends React.Component {

  render() {
    const {
      nodesFetchingState,
      nodeAddState,
      nodeUpdateState,
      nodeRemovingState,
      openModal,
      toggleItem,
      setNodeSelected,
      ...restProps
    } = this.props;

    const isRequestingState = (nodesFetchingState === 'requested' ||
      nodeUpdateState === 'requested' || nodeAddState === 'requested' ||
      nodeRemovingState === 'requested');

    const handleClick  = (type) => (e) => {
      e.stopPropagation();
      openModal({ data: type });
    };

    return nodesFetchingState === 'failed' ? <ErrorIndicator/> : (
      <>
        <Header
          isRequestingState={isRequestingState}
          nodesFetchingState={nodesFetchingState}
          handleClick={handleClick}
          {...restProps}
        />
        <div className="list-group">
          {isRequestingState ? <Loader/> : null}
          <TreeItem
            parentId={0}
            {...restProps}
            leftShift={0}
            toggleItem={toggleItem}
            setNodeSelected={setNodeSelected}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { nodes: { asyncState }, selectedNode } = state;
  return {
    nodesFetchingState: asyncState.nodesFetchingState,
    nodeAddState: asyncState.nodeAddState,
    nodeUpdateState: asyncState.nodeUpdateState,
    nodeRemovingState: asyncState.nodeRemovingState,
    selectedNode,
    nodes: treeNodesSelector(state),
  }
};

const actionCreators = {
  openModal: actions.openModal,
  fetchNodes: actions.fetchNodes,
  unsetSelectedNode: actions.unsetSelectedNode,
  setNodeSelected: actions.setNodeSelected,
  toggleItem: actions.toggleItem,
};

export default connect(mapStateToProps, actionCreators)(AppContainer);
