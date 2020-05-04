import C from '../actions/constants';
import { combineReducers } from 'redux';

export const data = (state={}, action) => {
  switch (action.type) {
    case C.USER_SET_DATA : 
      return action.payload;
    case C.USER_REMOVE_DATA : 
      return {};
    default :
      return state;
  }
}

export const token = (state='', action) => {
  switch (action.type) {
    case C.USER_SET_TOKEN : 
      return action.payload;
    case C.USER_REMOVE_TOKEN : 
      return null;
    default :
      return state;
  }
}

export default combineReducers({
  data,
  token
});
