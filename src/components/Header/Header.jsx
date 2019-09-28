import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import cn from 'classnames';

class Header extends React.Component {

  render() {
    const { selectedNode, fetchNodes } = this.props;

    const editButtonClasses = cn({
      btn: true,
      'btn-info': true,
    });

    const addButtonClasses = cn({
      btn: true,
      'btn-success': true,
    });

    const buttonProps = selectedNode.id ? {} : {
      disabled: 'disabled',
      'data-toggle': 'tooltip',
      'data-placement': 'bottom',
      title: 'Select node',
    };

    return (
      <>
        <div>
          <button type="button" className="btn btn-light" onClick={() => fetchNodes(0)}>
            <i className="fa fa-angle-down"/>
            Root
          </button>
          <button type="button" className={editButtonClasses} {...buttonProps}>Edit</button>
          <button type="button" className={addButtonClasses} {...buttonProps}>Add</button>
        </div>
        <hr/>
      </>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    selectedNode: state.selectedNode,
  }
};

export default connect(mapStateToProps, actions)(Header);
