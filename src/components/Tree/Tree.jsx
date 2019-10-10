import React from 'react';
import {connect} from 'react-redux';
import Loader from '../Loader';
import * as actions from '../../actions';
import TreeItem from '../TreeItem';
import treeNodesSelector from '../../selectors/makeTree';

import './tree.css';
import ErrorIndicator from '../ErrorIndicator';

class Tree extends React.Component {

  render() {
    const {
      nodesFetchingState,
      nodeAddState,
      nodeUpdateState,
      nodeRemovingState,
      ...props
    } = this.props;

    const isRequestingState = (nodesFetchingState === 'requested' ||
      nodeUpdateState === 'requested' || nodeAddState === 'requested' ||
      nodeRemovingState === 'requested');

    return nodesFetchingState === 'failed' ? <ErrorIndicator/> : (
      <div className="list-group">
          {isRequestingState ? <Loader/> : null}
          <TreeItem parentId={0} {...props} leftShift={0}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodesFetchingState: state.nodes.asyncState.nodesFetchingState,
    nodeAddState: state.nodes.asyncState.nodeAddState,
    nodeUpdateState: state.nodes.asyncState.nodeUpdateState,
    nodeRemovingState: state.nodes.asyncState.nodeRemovingState,
    selectedNode: state.selectedNode,
    nodes: treeNodesSelector(state),
  }
};

export default connect(mapStateToProps, actions)(Tree);
