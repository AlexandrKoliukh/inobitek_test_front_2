import React from 'react';
import cn from 'classnames';
import { fetchedParentIds } from '../../actions'

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

  getClassesLi = (id, hasChildren) => {
    const { selectedNode } = this.props;
    return cn({
      'list-group-item': true,
      parent: hasChildren,
      fetched: fetchedParentIds.includes(id),
      'active': selectedNode.id === id,
    });
  };

  getIconButton = (id, hasChildren) => cn({
    fa: true,
    'fa-folder': !fetchedParentIds.includes(id),
    'fa-folder-open': fetchedParentIds.includes(id) && hasChildren,
    'fa-file': fetchedParentIds.includes(id) && !hasChildren,
  });

  render() {
    const {
      parentId,
      leftShift,
      ...props
    } = this.props;

    return (
      this.getChildren(parentId).map((child) => {
          const hasChildren = this.getChildren(child.id).length !== 0;
          return (
            <React.Fragment key={child.id}>
              <span onClick={this.nodesFetch(child.id)}
                    className={this.getClassesLi(child.id, hasChildren)}
                    style={{ marginLeft: `${leftShift * 20}px` }}
              >
                {child.name}
                <button type="button" onClick={this.toggleUp(child.id)}
                        className="btn btn-secondary btn-sm float-left toggle-btn">
                  <i className={this.getIconButton(child.id, hasChildren)}/>
                </button>
              </span>
              {/*{!hasChildren ? (*/}
              {/*  <TreeItem parentId={child.id}*/}
              {/*            leftShift={leftShift + 1}*/}
              {/*            {...props}/>*/}
              {/*) : null}*/}
              <TreeItem parentId={child.id}
                        leftShift={leftShift + 1}
                        {...props}/>
            </React.Fragment>
          )
        }
      )
    );
  }
}

export default TreeItem;
