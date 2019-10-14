import { createAction } from 'redux-actions';

import * as service from '../service';

export let fetchedParentIds = [];

export const setNodeSelected = createAction('NODE_SET_SELECTED');
export const unsetSelectedNode = createAction('NODE_UNSET_SELECTED');

export const toggleUpItem = createAction('TREE_ITEM_TOGGLE_UP');

export const openForm = createAction('FORM_OPEN');
export const closeForm = createAction('FORM_CLOSE');

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
  fetchedParentIds = fetchedParentIds.filter((i) => [...deleteIds, id].indexOf(i) === -1)
};

export const fetchNodes = (parentId) => (dispatch) => {
  if (fetchedParentIds.indexOf(parentId) !== -1) return;
	fetchedParentIds.push(parentId);
  dispatch(fetchNodesRequest());
	return service.getNodesByParentId(parentId)
		.then((data) => {
			dispatch(fetchNodesSuccess({data}));
		})
		.catch((error) => {
			dispatch(fetchNodesFailure());
			throw error;
		});
};

export const addNode = (node) => (dispatch) => {
  dispatch(addNodeRequest());
	return service.addNode(node)
		.then((data) => dispatch(addNodeSuccess({data})))
		.catch((error) => {
			dispatch(addNodeFailure());
			throw error;
		});
};

export const removeNode = (node, childrenIds) => (dispatch) => {
  dispatch(removeNodeRequest());
	return service.removeNode(node)
		.then(() => dispatch(removeNodeSuccess({data: {id: node.id, deleteIds: childrenIds}})))
		.catch((error) => {
				dispatch(removeNodeFailure());
				throw error;
			}
		);
};

export const updateNode = (node) => (dispatch) => {
  dispatch(updateNodeRequest());
	return service.updateNode(node)
		.then((data) => dispatch(updateNodeSuccess({data})))
		.catch((error) => {
			dispatch(updateNodeFailure());
			throw error;
		});
};
