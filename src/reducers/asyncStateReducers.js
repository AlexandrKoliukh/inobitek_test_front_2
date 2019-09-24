import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const nodeAddState = handleActions({
  [actions.addNodeRequest]() {
    return 'requested';
  },
  [actions.addNodeFailure]() {
    return 'failed';
  },
  [actions.addNodeSuccess]() {
    return 'finished';
  },
}, 'none');

const nodeUpdateState = handleActions({
  [actions.updateNodeRequest]() {
    return 'requested';
  },
  [actions.updateNodeFailure]() {
    return 'failed';
  },
  [actions.updateNodeSuccess]() {
    return 'finished';
  },
}, 'none');

const nodeRemovingState = handleActions({
  [actions.removeNodeRequest]() {
    return 'requested';
  },
  [actions.removeNodeFailure]() {
    return 'failed';
  },
  [actions.removeNodeSuccess]() {
    return 'finished';
  },
}, 'none');

const nodesFetchingState = handleActions({
  [actions.fetchNodesRequest]() {
    return 'requested';
  },
  [actions.fetchNodesFailure]() {
    return 'failed';
  },
  [actions.fetchNodesSuccess]() {
    return 'finished';
  },
}, 'none');

export {
  nodesFetchingState,
  nodeUpdateState,
  nodeAddState,
  nodeRemovingState,
}
