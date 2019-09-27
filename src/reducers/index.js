import { combineReducers } from 'redux';

import * as asyncStateReducers from './asyncStateReducers';
import nodes from './nodesReducers';
import selectedNode from './selectedNodeReducers';

export default combineReducers({
  ...asyncStateReducers,
  nodes,
  selectedNode,
});
