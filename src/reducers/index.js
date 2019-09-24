import { combineReducers } from 'redux';

import * as asyncStateReducers from './asyncStateReducers';
import nodes from './nodesReducers'

export default combineReducers({
  ...asyncStateReducers,
  nodes,
});
