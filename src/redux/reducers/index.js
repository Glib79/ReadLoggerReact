import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';
import fetchersReducer from './fetchers';
import messages from './messages';
import userReducer from './user';
import version from './version';

const rootReducer = combineReducers({ 
  version, 
  fetchers: fetchersReducer, 
  i18n: i18nReducer, 
  messages, 
  user: userReducer 
});

export default rootReducer;