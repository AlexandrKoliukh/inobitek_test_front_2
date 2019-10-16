import React from 'react';
import cn from 'classnames';
import { fetchedParentIds } from '../../actions'

import './tree-item.css';
import { extractChildrenById } from '../../utils/aroundTree';

class TreeItem extends React.Component {

  state = {
    toggledItems: [],
  };

  nodesFetch = (id, itemProps) => (e) => {
    if (itemProps.isToggled) {
      this.toggle(id, itemProps)(e);
    }
    const { fetchNodes, setNodeSelected } = this.props;
    fetchNodes(id);
    setNodeSelected(id);
  };

  getChildren = (id) => {
    const { nodes } = this.props;
    if (!nodes) return [];
    if (id === 0) return nodes; //for first render from Root
    return extractChildrenById(id, nodes);
  };

  toggle = (id, itemProps) => (e) => {
    e.stopPropagation();
    const { setNodeSelected } = this.props;
    const { toggledItems } = this.state;

    if (!itemProps.isFetched) {
      this.setState({ toggledItems: [...toggledItems, id] });
      return;
    }
    setNodeSelected(id);

    if (!itemProps.isToggled) {
      this.setState({ toggledItems: toggledItems.filter((i) => i !== id) });
    } else {
      this.setState({ toggledItems: [...toggledItems, id] });
    }
  };

  getClassesLi = (id, { hasChildren, isFetched }) => {
    const { selectedNode } = this.props;
    return cn({
      'list-group-item': true,
      parent: hasChildren,
      fetched: isFetched,
      'active': selectedNode.id === id,
    });
  };

  getButtonIcon = (id, { hasChildren, isFetched, isToggled }) => {
    return cn({
      fa: true,
      'fa-folder': !isFetched || isToggled,
      'fa-folder-open': isFetched && hasChildren && !isToggled,
      'fa-file': isFetched && !hasChildren,
    });
  };

  render() {
    const {
      parentId,
      leftShift,
      ...props
    } = this.props;

    const { toggledItems } = this.state;

    return (
      this.getChildren(parentId).map((child) => {
        const itemProps = {
          hasChildren: this.getChildren(child.id).length !== 0,
          isToggled: !toggledItems.includes(child.id),
          isFetched: fetchedParentIds.includes(child.id),
        };

        return (
          <React.Fragment key={child.id}>
            <ul className="list-item-container">
            <li onClick={this.nodesFetch(child.id, itemProps)}
                  className={this.getClassesLi(child.id, itemProps)}
            >
              {child.name}
              <button type="button"
                      onClick={this.toggle(child.id, itemProps)}
                      className="btn btn-secondary btn-sm float-left toggle-btn"
              >
                <i className={this.getButtonIcon(child.id, itemProps)}/>
              </button>
            </li>
              {itemProps.isToggled ? null :
                <TreeItem parentId={child.id}
                          leftShift={leftShift + 1}
                          {...props}/>
              }
            </ul>
          </React.Fragment>
        )
      })
    );
  }
}

export default TreeItem;
