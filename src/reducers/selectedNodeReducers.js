import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const selectedNode = handleActions({
  [actions.setNodeSelected](state, { payload }) {
    return { ...payload };
  },
  [actions.unsetSelectedNode]() {
    return {};
  },
}, {});

export default selectedNode;
