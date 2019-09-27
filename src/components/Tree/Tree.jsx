import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader';
import * as actions from '../../actions';
import TIt from './TIt';

class Tree extends React.Component {

  state = {
    mappedNodes: new Map(),
  };

  handleClick = (id) => () => {
    const { fetchNodes } = this.props;
    fetchNodes(id);
  };

  componentDidMount() {
    const { fetchNodes } = this.props;
    fetchNodes(0);
  }

  static getDerivedStateFromProps(props, state) {
    const { nodesFetchingState, nodes } = props;
    if (nodesFetchingState !== 'finished') return null;
    if (state.mappedNodes.size === 0) return {
      mappedNodes: new Map().set(0, [...nodes]),
    };
    const mappedNodes = new Map();
    nodes.filter(i => !mappedNodes.has(i.id)).forEach((node) => {
      mappedNodes.set(node.id, nodes.filter(ii => ii.parent_id === node.id));
    });
    return {
      mappedNodes,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   const { nodes } = props;
  //
  // }

  render() {
    const { nodesFetchingState } = this.props;
    const { mappedNodes } = this.state;
    return nodesFetchingState === 'requested' ? <Loader/> : (
      <div className="treeview w-20 border">
        <h6 className="pt-3 pl-3">Folders</h6>
        <hr/>
        <ul className="mb-1 pl-3 pb-2">
          {mappedNodes.size === 0 ? null :
            <TIt parent={{ name: 'Root', id: '0' }} mappedNodes={mappedNodes} nodeChildren={mappedNodes.get(0)}/>
          }
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
