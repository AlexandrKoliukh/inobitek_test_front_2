import React from 'react';
import { connect } from 'react-redux';
import TreeItem from '@material-ui/lab/TreeItem/TreeItem';

class TIt extends React.Component {

  render() {

    const { nodeChildren, mappedNodes, parent } = this.props;
    console.log(this.props);

    return (
      <TreeItem nodeId={parent.id} key={parent.id} label={parent.name}>
        {nodeChildren.map((child) => {
          const childChildren = mappedNodes.get(child.id);
          if (!childChildren) return <TreeItem nodeId={child.id} key={child.id} name={child.name}/>;
          return <TIt nodeChildren={childChildren} mappedNodes={mappedNodes} parent={child}/>;
        })}
      </TreeItem>
    );
  }
}

export default connect((state) => ({ nodes: state.nodes }))(TIt);
