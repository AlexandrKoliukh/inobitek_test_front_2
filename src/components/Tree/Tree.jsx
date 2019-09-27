import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader';
import * as actions from '../../actions';
import TIt from './TIt';

class Tree extends React.Component {

  render() {
    const { nodesFetchingState, nodes, fetchNodes, setNodeSelected, selectedNode } = this.props;
    return (
      <div>
        <span onClick={() => fetchNodes(0)}>Root</span>
        <div className="list-group">
          {nodesFetchingState === 'requested' ? <Loader/> :
            <TIt parentId={0} nodes={nodes} fetchNodes={fetchNodes}
                 setNodeSelected={setNodeSelected}
                 selectedNode={selectedNode}/>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodesFetchingState: state.nodesFetchingState,
    selectedNode: state.selectedNode,
    nodes: state.nodes,
  }
};

export default connect(mapStateToProps, actions)(Tree);
