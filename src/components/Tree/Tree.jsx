import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader';
import * as actions from '../../actions';
import TreeItem from '../TreeItem';
import treeNodesSelector from '../../selectors/makeTree';

import './tree.css';
import Header from '../Header/Header';

class Tree extends React.Component {

  render() {
    const {
      nodesFetchingState,
      nodes,
      fetchNodes,
      setNodeSelected,
      selectedNode,
      toggleItem,
      nodeAddState,
      nodeUpdateState,
      nodeRemovingState,
    } = this.props;

    const isRequestingState = (nodesFetchingState === 'requested' ||
      nodeUpdateState === 'requested' || nodeAddState === 'requested' ||
      nodeRemovingState === 'requested');

    return (
      <div>
        <Header/>
        <div className="list-group">
          <div className="list-group-item" onClick={() => fetchNodes(0)}>
            <i className="fa fa-angle-down"/>
            Root
          </div>
          {isRequestingState ? <Loader/> : null}
          <TreeItem parentId={0} nodes={nodes} fetchNodes={fetchNodes}
                    setNodeSelected={setNodeSelected}
                    selectedNode={selectedNode}
                    toggleItem={toggleItem}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodesFetchingState: state.nodesFetchingState,
    nodeAddState: state.nodeAddState,
    nodeUpdateState: state.nodeUpdateState,
    nodeRemovingState: state.nodeRemovingState,
    selectedNode: state.selectedNode,
    nodes: treeNodesSelector(state),
  }
};

export default connect(mapStateToProps, actions)(Tree);
