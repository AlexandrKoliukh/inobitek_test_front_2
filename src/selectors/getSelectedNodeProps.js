import { createSelector } from 'reselect';
import { getNodeById } from '../utils/aroundTree';

const getSelectedNode = (state) => getNodeById(state.selectedNodeId, state.nodes.data);

const selectedNodeSelector = createSelector(
  getSelectedNode,
  (data) => data,
);

export default selectedNodeSelector;
