import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const defaultState = {
  data: [], asyncState: {
    nodeAddState: 'none',
    nodeUpdateState: 'none',
    nodeRemovingState: 'none',
    nodesFetchingState: 'none',
  }
};

const nodes = handleActions({
  [actions.fetchNodesRequest](state) {
    return {
      ...state, asyncState: {
        ...state.asyncState, nodesFetchingState: 'requested',
      }
    };
  },
  [actions.fetchNodesFailure](state) {
    return {
      ...state, asyncState: {
        ...state.asyncState, nodesFetchingState: 'failed',
      }
    };
  },
  [actions.fetchNodesSuccess](state, { payload }) {
    const { data, asyncState } = state;
    const { nodes } = payload.data;
    if (nodes.length === 0) return {
      ...state, asyncState: {
        ...asyncState, nodesFetchingState: 'finished',
      }
    };
    return {
      ...state, data: [...data, ...nodes], asyncState: {
        ...asyncState, nodesFetchingState: 'finished',
      }
    };
  },

  [actions.addNodeRequest](state) {
    return {
      ...state, asyncState: {
        ...state.asyncState, nodeAddState: 'requested',
      }
    };
  },
  [actions.addNodeFailure](state) {
    return {
      ...state, asyncState: {
        ...state.asyncState, nodeAddState: 'failed',
      }
    };
  },
  [actions.addNodeSuccess](state, { payload }) {
    const { data, asyncState } = state;
    const { node } = payload.data;
    if (!node) return { ...state };
    return {
      ...state, data: [...data, node], asyncState: {
        ...asyncState, nodeAddState: 'finished',
      }
    };
  },

  [actions.removeNodeRequest](state) {
    return {
      ...state, asyncState: {
        ...state.asyncState, nodeRemovingState: 'requested',
      }
    };
  },
  [actions.removeNodeFailure](state) {
    return {
      ...state, asyncState: {
        ...state.asyncState, nodeRemovingState: 'failed',
      }
    };
  },
  [actions.removeNodeSuccess](state, { payload }) {
    const { data, asyncState } = state;
    const { deleteIds, id } = payload.data;
    return {
      ...state,
      data: data.filter(i => [...deleteIds, id].indexOf(i.id) === -1),
      asyncState: { ...asyncState, nodeRemovingState: 'finished' },
    }
  },

  [actions.updateNodeRequest](state) {
    return {
      ...state, asyncState: {
        ...state.asyncState, nodeUpdateState: 'requested',
      }
    };
  },
  [actions.updateNodeFailure](state) {
    return {
      ...state, asyncState: {
        ...state.asyncState, nodeUpdateState: 'failed',
      }
    };
  },
  [actions.updateNodeSuccess](state, { payload }) {
    const { data, asyncState } = state;
    const { node } = payload.data;
    const index = data.findIndex((item) => item.id === node.id);
    const newItem = { ...data[index], ...node };
    return {
      ...state,
      data: [...data.slice(0, index), newItem, ...data.slice(index + 1)],
      asyncState: { ...asyncState, nodeUpdateState: 'finished' },
    };
  },
  [actions.refreshState]() {
    return defaultState;
  }
}, defaultState);

export default nodes;
