import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader';
import * as actions from '../../actions';
import TIt from './TIt';

class Tree extends React.Component {

  render() {
    const { nodesFetchingState, nodes, fetchNodes } = this.props;
    return (
      <div>
        <span onClick={() => fetchNodes(0)}>Root</span>
        <ul>
          {nodesFetchingState === 'requested' ? <Loader/> :
            <TIt parentId={0} nodes={nodes} fetchNodes={fetchNodes}/>}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodesFetchingState: state.nodesFetchingState,
    nodes: state.nodes,
  }
};

export default connect(mapStateToProps, actions)(Tree);
