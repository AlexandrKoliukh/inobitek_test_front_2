import React from 'react';
import cn from 'classnames';

import './tree-item.css';
import { extractChildrenById, getChildrenIdsWide, getNodeById } from '../../utils/aroundTree';

class TreeItem extends React.Component {

  nodesFetch = (id) => (e) => {
    e.stopPropagation();
    const { fetchNodes, setNodeSelected, nodes } = this.props;
    fetchNodes(id);
    setNodeSelected(getNodeById(id, nodes));
  };

  getChildren = (id) => {
    const { nodes } = this.props;
    if (!nodes) return [];
    if (id === 0) return nodes; //for first render from Root
    return extractChildrenById(id, nodes);
  };

  toggleUp = (id) => (e) => {
    e.stopPropagation();
    const { toggleItem, nodes, setNodeSelected } = this.props;
    const deleteIds = getChildrenIdsWide(id, nodes);
    toggleItem(deleteIds, id);
    setNodeSelected(getNodeById(id, nodes));
  };

  getClassesLi = (id) => {
    const { selectedNode } = this.props;
    return cn({
      'list-group-item': true,
      'active': selectedNode.id === id,
    });
  };

  render() {
    const {
      parentId,
      ...props
    } = this.props;

    return (
      this.getChildren(parentId).map((child) => {
          return (
            <li key={child.id} onClick={this.nodesFetch(child.id)}
                className={this.getClassesLi(child.id)}
                onMouseOver={e => {
                  e.stopPropagation();
                  e.currentTarget.classList.add('hover');
                }}
                onMouseOut={e => {
                  e.stopPropagation();
                  e.currentTarget.classList.remove('hover');
                }}>

              <span className="node-name">
                {child.name}
                <button type="button" onClick={this.toggleUp(child.id)}
                        className="btn btn-secondary btn-sm float-right">
                  <i className="fa fa-arrow-up"/>
                </button>
              </span>

              <div className="br"/>
              <ul>
                <TreeItem parentId={child.id} {...props}/>
              </ul>
            </li>
          )
        }
      )
    );
  }
}

export default TreeItem;
