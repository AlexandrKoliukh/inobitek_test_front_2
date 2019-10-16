import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { ViewNodeForm } from '../../components/forms/';
import selectedNodeSelector from '../../selectors/getSelectedNodeProps';

class ViewFormContainer extends React.Component {

  handleSubmit = (e) => {
    const { openForm } = this.props;
    e.persist();
    openForm('edit');
  };

  handleClick = (type) => (e) => {
    e.stopPropagation();
    e.persist();
    const { openForm } = this.props;
    openForm(type);
  };

  render() {
    const { handleSubmit, formState } = this.props;
    if (formState.data !== 'view') return null;

    return (
      <ViewNodeForm
        onSubmit={handleSubmit(this.handleSubmit)}
        onClick={this.handleClick}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const selectedNode = selectedNodeSelector(state);
  const { name, ip, port } = selectedNodeSelector(state);
  return {
    nodeUpdateState: state.nodeUpdateState,
    selectedNode,
    editFormState: state.editFormState,
    initialValues: { name, ip, port },
    formState: state.formState,
  }
};

const actionCreators = {
  updateNode: actions.updateNode,
  unsetSelectedNode: actions.unsetSelectedNode,
  openForm: actions.openForm
};

const initFormState = reduxForm({
  form: 'viewNodeForm',
  enableReinitialize: true,
})(ViewFormContainer);

export default connect(mapStateToProps, actionCreators)(initFormState);
