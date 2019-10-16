import React from 'react';
import { connect } from 'react-redux';
import Loader from '../components/Loader/Loader';
import * as actions from '../actions';
import cn from 'classnames';
import treeNodesSelector from '../selectors/makeTree';
import ErrorIndicator from '../components/ErrorIndicator';
import Row from '../components/Row/Row';
import TreeItem from '../components/TreeItem/TreeItem';
import ViewFormContainer from './forms/ViewFormContainer';
import EditFormContainer from './forms/EditFormContainer';
import AddFormContainer from './forms/AddFormContainer';
import DeleteFormContainer from './forms/DeleteFormContainer';
import selectedNodeSelector from '../selectors/getSelectedNodeProps';

class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    props.fetchNodes(0);
  }

  handleClick = (type) => (e) => {
    e.stopPropagation();
    const { openForm } = this.props;
    openForm(type);
  };

  render() {
    const {
      nodesFetchingState,
      nodeAddState,
      nodeUpdateState,
      nodeRemovingState,
      setNodeSelected,
      selectedNode,
      unsetSelectedNode,
      closeForm,
      nodes,
      refreshNodes,
      ...restProps
    } = this.props;

    const isRequestingState = (
      nodesFetchingState === 'requested' || nodeUpdateState === 'requested'
      || nodeAddState === 'requested' || nodeRemovingState === 'requested'
    );

    const isDeleteDisabled = !selectedNode.id;

    const rootClasses = cn({
      "list-group-item": true,
      "root-item": true,
      active: !selectedNode.id,
    });

    const treeView = (
      <ul className="list-group">
        {isRequestingState ? <Loader/> : null}
        <span className={rootClasses}
              onClick={() => {
                unsetSelectedNode();
                closeForm();
              }}
        >
          root
        </span>
        <TreeItem
          parentId={0}
          selectedNode={selectedNode}
          nodes={nodes}
          {...restProps}
          leftShift={1}
          setNodeSelected={setNodeSelected}
        />
      </ul>
    );

    const nodeView = (
      <>
        <ViewFormContainer/>
        <EditFormContainer/>
        <AddFormContainer/>
        <DeleteFormContainer/>
      </>
    );

    return (
      <>
        {nodesFetchingState === 'failed' ? <ErrorIndicator/> : (
          <Row left={treeView}
               right={nodeView}
               onClick={this.handleClick}
               isDeleteDisabled={isDeleteDisabled}
               isRequestingState={isRequestingState}
               refreshNodes={refreshNodes}
               closeForm={closeForm}
               unsetSelectedNode={unsetSelectedNode}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { nodes: { asyncState } } = state;
  return {
    nodesFetchingState: asyncState.nodesFetchingState,
    nodeAddState: asyncState.nodeAddState,
    nodeUpdateState: asyncState.nodeUpdateState,
    nodeRemovingState: asyncState.nodeRemovingState,
    selectedNode: selectedNodeSelector(state),
    nodes: treeNodesSelector(state),
  }
};

const actionCreators = {
  openForm: actions.openForm,
  closeForm: actions.closeForm,
  fetchNodes: actions.fetchNodes,
  refreshNodes: actions.refreshNodes,
  setNodeSelected: actions.setNodeSelected,
  unsetSelectedNode: actions.unsetSelectedNode,
};

export default connect(mapStateToProps, actionCreators)(AppContainer);
