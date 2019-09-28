import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import './tree-item.css';
import { extractChildrenById, getChildrenIdsWide } from '../../utils/aroundTree';
import { getNodeById } from '../../utils/getNodeById';

class TreeItem extends React.Component {

  handleClick = (id) => (e) => {
    e.stopPropagation();
    const { fetchNodes, setNodeSelected, nodes } = this.props;
    fetchNodes(id);
    setNodeSelected(getNodeById(id, nodes));
  };

  getChildren = (id) => {
    const { nodes } = this.props;
    if (!nodes) return [];
    if (id === 0) return nodes;
    return extractChildrenById(id, nodes);
  };

  toggleUp = (id) => (e) => {
    e.stopPropagation();
    const { toggleItem, nodes, setNodeSelected } = this.props;
    const deleteIds = getChildrenIdsWide(id, nodes);
    toggleItem(deleteIds, id);
    setNodeSelected(getNodeById(id, nodes));
  };

  render() {

    const {
      parentId,
      nodes,
      fetchNodes,
      selectedNode,
      setNodeSelected,
      toggleItem,
    } = this.props;
    const getClassesLi = (id) => cn({
      'list-group-item': true,
      'active': selectedNode.id === id,
    });
    return (
      this.getChildren(parentId).map((child) => {
          return (
            <div key={child.id} onClick={this.handleClick(child.id)}
                 className={getClassesLi(child.id)}
            onMouseOver={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseMove={(e) => e.stopPropagation()}
            >

              <span className="node-name">{child.name}
                <button type="button"
                        className="btn btn-danger btn-sm float-right">
                  <i className="fa fa-trash-o"/>
                </button>
                <button type="button" onClick={this.toggleUp(child.id)}
                        className="btn btn-secondary btn-sm float-right">
                  <i className="fa fa-arrow-up"/>
                </button>
              </span>

              <TreeItem parentId={child.id} nodes={nodes} fetchNodes={fetchNodes}
                        setNodeSelected={setNodeSelected}
                        selectedNode={selectedNode}
                        toggleItem={toggleItem}
              />
            </div>
          )
        }
      )
    );
  }
}

const mapStateToProps = () => {

  return {}
};

export default connect(mapStateToProps)(TreeItem);
