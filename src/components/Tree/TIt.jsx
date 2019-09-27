import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import cn from 'classnames';

import './tit.css';

class TIt extends React.Component {

  state = {
    active: false,
  };

  handleClick = (id) => (e) => {
    e.stopPropagation();
    const { fetchNodes, setNodeSelected, nodes } = this.props;
    fetchNodes(id);
    setNodeSelected(nodes.filter(i => i.id === id)[0]);
  };

  getChildren = (id) => {
    const { nodes } = this.props;
    if (nodes.length === 0) return [];
    if (id === 0) return nodes.filter(i => _.isNull(i.parent_id));
    return nodes.filter(i => i.parent_id === id);
  };

  render() {

    const { parentId, nodes, fetchNodes, selectedNode, setNodeSelected } = this.props;
    const getClassesLi = (id) => cn({
      'list-group-item': true,
      'active': selectedNode.id === id,
    });

    return (
      this.getChildren(parentId).map((child) => {
          return (
            <div key={child.id} onClick={this.handleClick(child.id)}
                 className={getClassesLi(child.id)}>

              <span className="node-name">{child.name}
                <button type="button"
                        className="btn btn-danger btn-sm float-right">
                  <i className="fa fa-trash-o"/>
                </button>
                <button type="button"
                        className="btn btn-secondary btn-sm float-right">
                  <i className="fa fa-close"/>
                </button>
              </span>

              <TIt parentId={child.id} nodes={nodes} fetchNodes={fetchNodes}
                   setNodeSelected={setNodeSelected}
                   selectedNode={selectedNode}/>
            </div>
          )
        }
      )
    );
  }
}

const mapStateToProps = (state) => {

  return {
    nodesFetchingState: state.nodesFetchingState,
  }
};

export default connect(mapStateToProps)(TIt);
