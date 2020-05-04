import C from '../actions/constants';
import { combineReducers } from 'redux';

const login = (state=false, action) => {
  if (action.type === C.FETCHER_LOGIN_TOGGLE) {
    return action.payload;
  }
  
  return state;
};

export default combineReducers({
  login
});
