import React from 'react';
import { connect } from 'react-redux';
import TreeItem from '@material-ui/lab/TreeItem/TreeItem';
import Loader from '../Loader';
import * as actions from '../../actions';
import _ from 'lodash';

class TIt extends React.Component {

  handleClick = (id) => () => {
    const { fetchNodes } = this.props;
    fetchNodes(id);
  };

  getChildren = (id) => {
    const { nodes } = this.props;
    if (nodes.length === 0) return [];
    if (id === 0) return nodes.filter(i => _.isNull(i.parent_id));
    return nodes.filter(i => i.parent_id === id);
  };

  render() {

    const { nodesFetchingState, parentId, nodes, fetchNodes } = this.props;

    return (
      this.getChildren(parentId).map((child) => {
        return <li key={child.id} onClick={this.handleClick(child.id)}>{child.name}
          <ul data-state="unrendered">
            {nodesFetchingState === 'requested' ? <Loader/> :
             <TIt parentId={child.id} nodes={nodes} fetchNodes={fetchNodes}/>}
          </ul>
        </li>
      }
      )
    );
  }
}

const mapStateToProps = (state) => {

  return {
    // nodes: state.nodes,
    nodesFetchingState: state.nodesFetchingState,
  }
};

export default connect(mapStateToProps)(TIt);
