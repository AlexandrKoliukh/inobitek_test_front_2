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
    if (state.length === 0) return []; // for add node when view tree not fetched
    return [...state, node]
  },
  [actions.removeNodeSuccess](state, { payload: { deleteIds, id } }) {
    return [...state.filter(i => !_.includes([...deleteIds, id], i.id))]
  },
  [actions.updateNodeSuccess](state, { payload }) {
    const { node } = payload.response.data;
    const index = state.findIndex((item) => item.id === node.id);
    const newItem = { ...state[index], ...node };
    return [...state.slice(0, index), newItem, ...state.slice(index + 1)];
  },
  [actions.toggleUpItem](state, { payload: { deleteIds } }) {
    return [...state.filter(i => !_.includes(deleteIds, i.id))]
  },
}, []);
export default nodes;
