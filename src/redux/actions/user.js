import C from './constants';
import axios from 'axios';
import { addMessage } from './messages';
import { prepareOptions } from '../../config/api';

export const login = (username, password) => dispatch => {
  dispatch({
    type: C.FETCHER_LOGIN_TOGGLE,
    payload: true
  });
  
  const options = prepareOptions(
    '/auth/login_check', 
    'POST', 
    { username: username, password: password }
  );
  
  axios(options)
    .then(response => {
      dispatch({
        type: C.USER_SET_TOKEN,
        payload: response.data.data.token
      });
      dispatch({
        type: C.USER_SET_DATA,
        payload: response.data.data.user
      });
    })
    .catch(error => {
      let message;

      if (error.response) {
        message = (error.response.status === 400 || error.response.status === 401) 
          ? 'actions.wrongLoginData' 
          : error.response.data.message;
      }

      if (!message) {
        message = error.message;
      }

      dispatch(
        addMessage(message, 'danger')
      );
    });
  
    dispatch({
      type: C.FETCHER_LOGIN_TOGGLE,
      payload: false
    });
}

export const logout = () => dispatch => {
  dispatch({
    type: C.USER_REMOVE_DATA
  });
  dispatch({
    type: C.USER_REMOVE_TOKEN
  });
  dispatch(
    addMessage('actions.logout', 'success')
  )
}

