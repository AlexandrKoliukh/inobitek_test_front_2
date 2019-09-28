import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const modalState = handleActions({
  [actions.openModal](state, { payload }) {
    return {
      open: true,
      data: payload.data,
    }
  },
  [actions.closeModal](state, { payload }) {
    return {
      open: false,
      data: ''
    }
  }
}, { open: false, data: '' });

export default modalState;
