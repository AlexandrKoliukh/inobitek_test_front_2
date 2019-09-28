import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import _ from 'lodash';

const nodes = handleActions({
  [actions.fetchNodesSuccess](state, { payload }) {
    const { nodes, dataExists, dbError } = payload.response.data;
    if (!dataExists && !dbError) return [...state];
    return [...state, ...nodes];
  },
  [actions.addNodeSuccess](state, { payload }) {
    const { node } = payload.response.data;
    return [...state, node]
  },
  [actions.removeNodeSuccess](state, { payload: { deleteIds, id } }) {
    return [...state.filter(i => !_.includes([...deleteIds, id], i.id))]
  },
  [actions.updateNodeSuccess](state, { payload }) {
    const { node } = payload.response.data;
    const stateWithoutUpdatedNode = state.filter(i => i.id !== node.id);
    return [...stateWithoutUpdatedNode, node]
  },
  [actions.toggleUpItem](state, { payload: { deleteIds }}) {
    return [...state.filter(i => !_.includes(deleteIds, i.id))]
  },
}, []);
export default nodes;
