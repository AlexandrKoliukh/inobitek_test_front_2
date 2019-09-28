import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as asyncStateReducers from './asyncStateReducers';
import nodes from './nodesReducers';
import selectedNode from './selectedNodeReducers';
import modalState from './uiStateReducers';

export default combineReducers({
  ...asyncStateReducers,
  modalState,
  nodes,
  selectedNode,
  form: formReducer,
});
