import { createSelector } from 'reselect';
import { keyBy } from 'lodash';
const getNodes = state => state.nodes;

const nodesByIdSelector = createSelector(
  getNodes,
  nodes => keyBy(nodes, 'id'),
);

export default nodesByIdSelector;
