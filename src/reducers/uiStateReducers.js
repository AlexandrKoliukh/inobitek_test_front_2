import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const formState = handleActions({
  [actions.openForm](state, { payload }) {
    return {
      data: payload,
    }
  },
  [actions.closeForm]() {
    return {
      data: 'view'
    }
  }
}, { data: 'view' });

export default formState;
