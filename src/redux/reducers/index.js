import { combineReducers } from 'redux';
import { RESET_STORE } from '../types';
import ChatReducer from './ChatReducer'
const rootReducer = combineReducers({
  Chat: ChatReducer
});

const rootReducerBridge = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return rootReducer(state, action);
};

export default rootReducerBridge;
