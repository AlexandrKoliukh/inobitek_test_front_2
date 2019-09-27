import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class TIt extends React.Component {

  handleClick = (id) => () => {
    const { fetchNodes } = this.props;
    fetchNodes(id);
  };

  render() {

    const { nodeChildren, mappedNodes, parent } = this.props;
    console.log(this.props);

    return (
      <li key={parent.id}><i className="fas fa-angle-right rotate"/>
        <span><i className="far fa-envelope-open ic-w mx-1"/>{parent.name}</span>
        <ul className="nested">
        {!nodeChildren ? null : nodeChildren.map((child) => {
          const childChildren = mappedNodes.get(child.id);
          if (!childChildren) return (
                <li key={child.id} onClick={this.handleClick(child.id)}><i className="fas fa-angle-right rotate"/>
                  <span>{child.name}</span>
                </li>
            );
          return <TIt nodeChildren={childChildren} mappedNodes={mappedNodes} parent={child}/>;
        })}
        </ul>
      </li>
    );
  }
}

export default connect((state) => ({ nodes: state.nodes }), actions)(TIt);
