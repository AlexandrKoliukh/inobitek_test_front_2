import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const modalState = handleActions({
  [actions.openModal](state, { payload }) {
    return {
      open: true,
      data: payload.data,
    }
  },
  [actions.closeModal]() {
    return {
      open: false,
      data: 'none'
    }
  }
}, { open: false, data: 'none' });

export default modalState;
