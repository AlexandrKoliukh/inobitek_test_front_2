import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { getChildrenIdsWide } from '../../utils/aroundTree';
import treeNodesSelector from '../../selectors/makeTree';


class DeleteNodeDialog extends React.Component {

  onRemove = () => {
    const { removeNode, selectedNode, closeModal, setNodeSelected, nodes } = this.props;
    const childrenIds = getChildrenIdsWide(selectedNode.id, nodes);
    removeNode(selectedNode, childrenIds);
    closeModal();
    setNodeSelected({});
  };

  render() {

    const { closeModal } = this.props;

    return (
      <div>
        <p>Nested elements will deleted too</p>
        <button onClick={this.onRemove}
                className="btn btn-danger">Delete
        </button>
        <button onClick={() => closeModal()} className="btn btn-secondary">Cancel</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    selectedNode: state.selectedNode,
    nodes: treeNodesSelector(state),
  }
};

const actionCreators = {
  closeModal: actions.closeModal,
  removeNode: actions.removeNode,
  setNodeSelected: actions.setNodeSelected,
};

export default connect(mapStateToProps, actionCreators)(DeleteNodeDialog);
