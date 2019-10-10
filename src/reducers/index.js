import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import nodes from './nodesReducers';
import selectedNode from './selectedNodeReducers';
import modalState from './uiStateReducers';

export default combineReducers({
  modalState,
  nodes,
  selectedNode,
  form: formReducer,
});
