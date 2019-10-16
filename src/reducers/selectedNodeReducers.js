import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const selectedNodeId = handleActions({
  [actions.setNodeSelected](state, { payload }) {
    return payload;
  },
  [actions.unsetSelectedNode]() {
    return 0;
  },
}, 0);

export default selectedNodeId;
