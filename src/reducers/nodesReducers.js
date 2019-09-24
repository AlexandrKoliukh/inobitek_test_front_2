import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const nodes = handleActions({
  [actions.fetchNodesSuccess](state, { payload }) {
    const { nodes, dataExists, dbError } = payload.response.data;
    if (!dataExists && !dbError) return [];
    return [...state, ...nodes]
  },
  [actions.addNodeSuccess](state, { payload }) {
    const { node } = payload.response.data;
    return [ ...state, { [node.id]: node } ]
  },
  [actions.removeNodeSuccess](state, { payload }) {
    const { id } = payload;
    return state.filter(i => id !== i.id );
  },
  [actions.updateNodeSuccess](state, { payload }) {
    const { node } = payload.response.data;
    const stateWithoutUpdatedNode = state.filter(i => node.id !== i.id );
    return [...stateWithoutUpdatedNode, { [node.id]: node }];
  },
}, []);

export default nodes;
