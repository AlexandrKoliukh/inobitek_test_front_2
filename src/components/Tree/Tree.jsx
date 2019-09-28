import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader';
import * as actions from '../../actions';
import TIt from '../TreeItem';
import treeNodesSelector from '../../selectors/makeTree';
import cn from 'classnames';

import './tree.css';

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
      nodeUpdateState === 'requesting' || nodeAddState === 'requested' ||
      nodeRemovingState === 'requesting');

    const editButtonClasses= cn({
      btn: true,
      'btn-info': true,
    });

    const addButtonClasses= cn({
      btn: true,
      'btn-success': true,
    });

    const buttonProps =  selectedNode.id ? {} : {
      disabled: 'disabled',
      'data-toggle': 'tooltip',
      'data-placement': 'bottom',
      title: 'Select node',
    };

    return (
      <div>
        <div>
          <button type="button" className="btn btn-light" onClick={() => fetchNodes(0)}>
            <i className="fa fa-angle-down"/>
            Root
          </button>
          <button type="button" className={editButtonClasses} {...buttonProps}>Edit</button>
          <button type="button" className={addButtonClasses} {...buttonProps}>Add</button>
        </div>
        <hr/>
        <div className="list-group">
          {isRequestingState ?
            (
              <>
                <Loader/>
                <TIt parentId={0} nodes={nodes} fetchNodes={fetchNodes}
                     setNodeSelected={setNodeSelected}
                     selectedNode={selectedNode}
                     toggleItem={toggleItem}
                />
              </>
            )
            : (
              <TIt parentId={0} nodes={nodes} fetchNodes={fetchNodes}
                   setNodeSelected={setNodeSelected}
                   selectedNode={selectedNode}
                   toggleItem={toggleItem}
              />
            )}
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
