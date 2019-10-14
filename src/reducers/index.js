import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import nodes from './nodesReducers';
import selectedNode from './selectedNodeReducers';
import formState from './uiStateReducers';

export default combineReducers({
  formState,
  nodes,
  selectedNode,
  form: formReducer,
});
