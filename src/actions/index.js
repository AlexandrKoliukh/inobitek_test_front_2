import axios from 'axios';
import { createAction } from 'redux-actions';
import _ from 'lodash';

import routes from '../routes';

const fetchedParentIds = [];

export const setNodeSelected = createAction('NODE_SET_SELECTED');
export const toggleUpItem = createAction('TREE_ITEM_TOGGLE_UP');

export const openModal = createAction('MODAL_OPEN');
export const closeModal = createAction('MODAL_CLOSE');

export const removeNodeRequest = createAction('NODES_REMOVE_REQUEST');
export const removeNodeSuccess = createAction('NODES_REMOVE_SUCCESS');
export const removeNodeFailure = createAction('NODES_REMOVE_FAILURE');

export const addNodeRequest = createAction('NODES_ADD_REQUEST');
export const addNodeSuccess = createAction('NODES_ADD_SUCCESS');
export const addNodeFailure = createAction('NODES_ADD_FAILURE');

export const updateNodeRequest = createAction('NODES_UPDATE_REQUEST');
export const updateNodeSuccess = createAction('NODES_UPDATE_SUCCESS');
export const updateNodeFailure = createAction('NODES_UPDATE_FAILURE');

export const fetchNodesRequest = createAction('NODES_FETCH_REQUEST');
export const fetchNodesSuccess = createAction('NODES_FETCH_SUCCESS');
export const fetchNodesFailure = createAction('NODES_FETCH_FAILURE');

export const toggleItem = (deleteIds, id) => (dispatch) => {
  dispatch(toggleUpItem({ deleteIds }));
  _.pull(fetchedParentIds, ...deleteIds, id);
};

export const fetchNodes = (parentId) => async (dispatch) => {
  if (_.includes(fetchedParentIds, parentId)) return;
  dispatch(fetchNodesRequest());
  try {
    const url = routes.nodesUrl(parentId);
    const response = await axios.get(url);
    dispatch(fetchNodesSuccess({ response }));
    fetchedParentIds.push(parentId);
  } catch (e) {
    dispatch(fetchNodesFailure());
    throw e;
  }
};

export const addNode = (node) => async (dispatch) => {
  dispatch(addNodeRequest());
  try {
    const url = routes.nodeAddUrl();
    const response = await axios.post(url, node);
    dispatch(addNodeSuccess({ response }));
  } catch (e) {
    dispatch(addNodeFailure());
    throw e;
  }
};

export const removeNode = node => async (dispatch) => {
  dispatch(removeNodeRequest());
  try {
    const url = routes.nodeRemoveUrl();
    await axios.delete(url, { data: { id: node.id } });
    dispatch(removeNodeSuccess({ id: node.id }));
  } catch (e) {
    dispatch(removeNodeFailure());
    throw e;
  }
};

export const updateNode = (node) => async (dispatch) => {
  dispatch(updateNodeRequest());
  try {
    const url = routes.nodeUpdateUrl();
    const response = await axios.put(url, node);
    dispatch(updateNodeSuccess({ response }));
  } catch (e) {
    dispatch(updateNodeFailure());
    throw e;
  }
};
